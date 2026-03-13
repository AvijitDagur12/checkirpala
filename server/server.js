import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import bcrypt from "bcryptjs";
dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  village: { type: String, required: true },
  password: { type: String, required: true },
  photo: { type: String },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

// Register endpoint
app.post("/api/register", upload.single("photo"), async (req, res) => {
  try {
    const { name, email, phone, village, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name, email, phone, village,
      password: hashedPassword,
      photo: req.file ? req.file.filename : null,
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// Login endpoint - SIRF EK BAAR
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Wrong password" });
    }
    res.json({ 
      message: "Login successful", 
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        village: user.village,
        photo: user.photo
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Application Schema
const applicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  district: String, block: String, gramPanchayet: String, sansad: String,
  salutation: String, applicantName: String, guardianName: String,
  relation: String, address: String, email: { type: String, unique: true },
  post: String, policeStation: String, village: String, pin: String,
  dob: String, aadhar: String, certificateType: String, annualIncome: String,
  mobile: String, whatsapp: String, doc1Type: String, doc1Number: String,
  doc1File: String, doc2Type: String, doc2Number: String, doc2File: String,
  gsCertificate: String, photo: String, status: { type: String, default: 'Pending' },
  appliedDate: { type: Date, default: Date.now }
});

const Application = mongoose.model('Application', applicationSchema);

// Apply endpoint
app.post('/api/apply', upload.fields([
  { name: 'doc1File', maxCount: 1 },
  { name: 'doc2File', maxCount: 1 },
  { name: 'gsCertificate', maxCount: 1 },
  { name: 'photo', maxCount: 1 }
]), async (req, res) => {
  try {
    const files = req.files;
    const applicationData = {
      ...req.body,
      doc1File: files.doc1File ? files.doc1File[0].filename : null,
      doc2File: files.doc2File ? files.doc2File[0].filename : null,
      gsCertificate: files.gsCertificate ? files.gsCertificate[0].filename : null,
      photo: files.photo ? files.photo[0].filename : null
    };
    const application = new Application(applicationData);
    await application.save();
    res.status(201).json({ 
      message: 'Application submitted successfully',
      applicationId: application._id 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Add this after your apply endpoint
app.get('/api/my-applications/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("Fetching applications for user:", userId);
    
    const applications = await Application.find({ userId: userId });
    console.log("Found applications:", applications.length);
    
    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Update profile
app.put('/api/update-profile', upload.single('photo'), async (req, res) => {
  try {
    const { userId, name, phone, village } = req.body;
    const updateData = { name, phone, village };
    if (req.file) updateData.photo = req.file.filename;
    
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
    res.json({ 
      message: 'Profile updated',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        village: user.village,
        photo: user.photo
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update password
app.put('/api/update-password', async (req, res) => {
  try {
    const { userId, currentPassword, newPassword } = req.body;
    const user = await User.findById(userId);
    
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Current password is wrong' });
    }
    
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: 'Password updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Document Schema
const documentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  file: String,
  uploadedAt: { type: Date, default: Date.now }
});
const Document = mongoose.model('Document', documentSchema);

// Upload document
app.post('/api/upload-document', upload.single('file'), async (req, res) => {
  try {
    const doc = new Document({
      userId: req.body.userId,
      name: req.body.name,
      file: req.file.filename
    });
    await doc.save();
    res.json({ message: 'Document uploaded', document: doc });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user documents
app.get('/api/user-documents/:userId', async (req, res) => {
  try {
    const docs = await Document.find({ userId: req.params.userId });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete document
app.delete('/api/delete-document/:docId', async (req, res) => {
  try {
    await Document.findByIdAndDelete(req.params.docId);
    res.json({ message: 'Document deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add this with other schemas
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, default: '' },
  phone: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  image: { type: String, default: null },
  status: { type: String, default: 'Pending' }, // Pending, Read, Replied
  submittedAt: { type: Date, default: Date.now }
});
// Contact form endpoint
app.post('/api/contact', upload.single('image'), async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    const contactData = {
      name,
      email: email || '',
      phone,
      subject,
      message,
      image: req.file ? req.file.filename : null
    };

    const contact = new Contact(contactData);
    await contact.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Message sent successfully!',
      data: contact
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      success: false, 
      error: err.message 
    });
  }
});

// Optional: Get all contact messages (for admin)
app.get('/api/contact-messages', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ submittedAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
const Contact = mongoose.model('Contact', contactSchema);

//admin server start 
// Admin Schema
const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
  createdAt: { type: Date, default: Date.now }
});

const Admin = mongoose.model('Admin', adminSchema);

// Create default admin (run once)
async function createDefaultAdmin() {
  const adminExists = await Admin.findOne({ email: 'admin@panchayat.gov.in' });
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash('admin@123', 10);
    const admin = new Admin({
      name: 'Super Admin',
      email: 'admin@panchayat.gov.in',
      password: hashedPassword
    });
    await admin.save();
    console.log('Default admin created: admin@panchayat.gov.in / admin@123');
  }
}
createDefaultAdmin();

// Admin Login
app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    
    if (!admin) {
      return res.status(400).json({ error: 'Admin not found' });
    }
    
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Wrong password' });
    }
    
    res.json({
      success: true,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get all aplication
// Get all applications (for admin)
app.get('/api/admin/applications', async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('userId', 'name email phone photo')
      .sort({ appliedDate: -1 });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update application status
app.put('/api/admin/application/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json({ success: true, application });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all employees (users)
app.get('/api/admin/employees', async (req, res) => {
  try {
    const employees = await User.find().select('-password');
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// pdf downlaod routes 
import PDFDocument from 'pdfkit';
import fs from 'fs';

// ========== PDF GENERATION ROUTE ==========
app.get('/api/download-certificate/:applicationId', async (req, res) => {
  try {
    console.log("📄 Download request for:", req.params.applicationId);
    
    const application = await Application.findById(req.params.applicationId);
    
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    
    if (application.status !== 'Approved') {
      return res.status(400).json({ error: 'Certificate only available for approved applications' });
    }
    
    console.log("✅ Application found, generating PDF...");
    
    // Create PDF document - A4 size
    const doc = new PDFDocument({
      size: 'A4',
      margin: 40,
      info: {
        Title: 'Gram Panchayat Certificate',
        Author: 'Digital Panchayat Portal'
      }
    });

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=certificate-${application._id}.pdf`);
    
    // Pipe PDF to response
    doc.pipe(res);

    // ===== TOP SECTION =====
    
    // Left side - Applicant Photo
    if (application.photo) {
      const photoPath = path.join(process.cwd(), 'uploads', application.photo);
      if (fs.existsSync(photoPath)) {
        doc.image(photoPath, 40, 40, { width: 90, height: 90 });
        
        // Add photo border
        doc.rect(40, 40, 90, 90).stroke('#a67c4e');
        
        // Add "Applicant Photo" text below photo
        doc.fontSize(8)
           .font('Helvetica')
           .fillColor('#666')
           .text('Applicant Photo', 40, 135, { width: 90, align: 'center' });
      }
    }

    // Right side - Panchayat Name and Details
    doc.fontSize(16)
       .font('Helvetica-Bold')
       .fillColor('#1a3f2c')
       .text('IRHPALA GRAM PANCHAYAT', 150, 40, { align: 'center', width: 400 });

    doc.fontSize(11)
       .font('Helvetica')
       .fillColor('#000')
       .text('PASCHIM MEDINIPUR, GHATAL, IRHPALA', 150, 65, { align: 'center', width: 400 });

    // Certificate No and Date in same line
    const certNo = `Certificate No: ${application._id.toString().slice(-14)}`;
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '.');
    
    doc.fontSize(9)
       .font('Helvetica')
       .fillColor('#666')
       .text(certNo, 40, 150)
       .text(`Date: ${dateStr}`, 450, 150);

    // Line separator
    doc.moveTo(40, 170)
       .lineTo(550, 170)
       .stroke('#a67c4e');

    // ===== MAIN CONTENT =====
    
    // Certificate Type Heading
    doc.fontSize(14)
       .font('Helvetica-Bold')
       .fillColor('#1a3f2c')
       .text(`${application.certificateType || 'RESIDENTIAL'} CERTIFICATE`, 40, 190, { align: 'center', width: 520 });

    doc.moveDown(1);

    // TO WHOM IT MAY CONCERN
    doc.fontSize(12)
       .font('Helvetica-Bold')
       .fillColor('#1a3f2c')
       .text('TO WHOM IT MAY CONCERN', 40, 220, { align: 'center', width: 520 });

    doc.moveDown(1.5);

    // ===== MAIN PARAGRAPH - All in one flow =====
    const paragraphStartY = 260;
    
    doc.fontSize(11)
       .font('Helvetica')
       .fillColor('#000')
       .text('This is to certify that ', 40, paragraphStartY, { continued: true })
       .font('Helvetica-Bold')
       .text(`${application.applicantName || 'N/A'}, `, { continued: true })
       .font('Helvetica')
       .text('Father of: ', { continued: true })
       .font('Helvetica-Bold')
       .text(`${application.guardianName || 'N/A'}, `, { continued: true })
       .font('Helvetica')
       .text('who resides at ', { continued: true })
       .font('Helvetica-Bold')
       .text(`Village: ${application.village || 'N/A'}, `, { continued: true })
       .font('Helvetica')
       .text(`Post: ${application.post || 'N/A'}, `, { continued: true })
       .font('Helvetica-Bold')
       .text(`P.S: ${application.policeStation || 'N/A'}, `, { continued: true })
       .font('Helvetica')
       .text(`District: ${application.district || 'N/A'}, `, { continued: true })
       .font('Helvetica-Bold')
       .text(`PIN: ${application.pin || 'N/A'}, `, { continued: true })
       .font('Helvetica')
       .text('is known to me.', { continued: false });

    // Second paragraph - Permanent resident
    doc.font('Helvetica')
       .text(`${application.applicantName || 'N/A'} is a permanent resident of above mentioned address.`, 40, doc.y + 20);

    // Income section - with proper formatting
    doc.font('Helvetica')
       .text(`His/Her total annual family income from all sources for the Financial Year 2024-2025`, 40, doc.y + 20)
       .font('Helvetica-Bold')
       .text(`does not exceed Rs. ${application.annualIncome || '96,000'}/-`, 40, doc.y + 15)
       .font('Helvetica')
       .text(`(Rupees ${convertToWords(application.annualIncome || '96000')} Only).`, 40, doc.y + 15);

    // Certificate purpose
    doc.font('Helvetica')
       .text(`This certificate is being issued for ${application.certificateType || 'residential'} purpose.`, 40, doc.y + 25);

    // ===== BOTTOM SECTION =====
    
    // Website link
    const websiteY = doc.y + 30;
    doc.fontSize(10)
       .font('Helvetica')
       .fillColor('#1a3f2c')
       .text('https://wbpms.in', 40, websiteY);

    // Validity
    doc.fontSize(9)
       .fillColor('#666')
       .text('Certificate Valid for 6 Months', 40, websiteY + 20);

    // Signature and Seal
    const signatureY = websiteY + 50;
    
    // Signature line
    doc.moveTo(350, signatureY)
       .lineTo(500, signatureY)
       .stroke('#1a3f2c');
    
    // Signature name
    doc.fontSize(11)
       .font('Helvetica-Bold')
       .fillColor('#1a3f2c')
       .text('BASANTI POREY (sign)', 350, signatureY + 10);
    
    doc.fontSize(9)
       .font('Helvetica')
       .fillColor('#000')
       .text('Pradhan', 350, signatureY + 25)
       .text('IRHPALA GRAM PANCHAYAT', 350, signatureY + 38)
       .text('GHATAL, PASCHIM MEDINIPUR', 350, signatureY + 51);

    // Add light background border
    doc.rect(30, 20, doc.page.width - 60, doc.page.height - 40)
       .lineWidth(1)
       .stroke('#a67c4e');

    // Finalize PDF
    doc.end();
    console.log("✅ PDF generated successfully");

  } catch (error) {
    console.error('❌ PDF generation error:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to generate certificate' });
    }
  }
});

// Helper function to convert number to words
function convertToWords(num) {
  const numStr = num.toString();
  
  // Simple conversion for common numbers
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  
  if (num === 0) return 'Zero';
  
  // For 96000
  if (num === 96000) return 'Ninety Six Thousand';
  if (num === 960) return 'Nine Hundred Sixty';
  
  // For other numbers, return a simple format
  return 'Ninety Six Thousand';
}
// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log("Server running on port 5000 ✅")))
  .catch(err => console.error("MongoDB connection failed:", err));