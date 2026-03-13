import React, { useState, useEffect, useCallback } from 'react';
import './Support.css';
import axios from 'axios';

const Support = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        read: 0,
        replied: 0
    });

    // Calculate statistics
    const calculateStats = useCallback((data) => {
        const stats = {
            total: data.length,
            pending: data.filter(c => c.status === 'pending').length,
            read: data.filter(c => c.status === 'read').length,
            replied: data.filter(c => c.status === 'replied').length
        };
        setStats(stats);
    }, []);

    // Fetch all complaints
    const fetchComplaints = useCallback(async () => {
        try {
            setLoading(true);
            // CORRECT - just https://
            const response = await axios.get('https://checkirpala.onrender.com/api/contacts');
            if (response.data.success) {
                setComplaints(response.data.data);
                calculateStats(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching complaints:', error);
        } finally {
            setLoading(false);
        }
    }, [calculateStats]);

    useEffect(() => {
        fetchComplaints();
    }, [fetchComplaints]);

    // Update complaint status
    const updateStatus = async (id, newStatus) => {
        try {
            const response = await axios.put(`https://checkirpala.onrender.com/api/contact/${id}`, {
                status: newStatus
            });

            if (response.data.success) {
                const updatedComplaints = complaints.map(c =>
                    c._id === id ? { ...c, status: newStatus } : c
                );
                setComplaints(updatedComplaints);
                calculateStats(updatedComplaints);

                if (selectedComplaint && selectedComplaint._id === id) {
                    setSelectedComplaint({ ...selectedComplaint, status: newStatus });
                }
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    // Generate Ticket ID
    const generateTicketId = (complaint) => {
        const date = new Date(complaint.createdAt);
        const year = date.getFullYear().toString().slice(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const id = complaint._id.slice(-6).toUpperCase();
        return `TKT-${year}${month}${day}-${id}`;
    };

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    // Get status badge class
    const getStatusBadge = (status) => {
        switch (status) {
            case 'pending': return 'status-badge pending';
            case 'read': return 'status-badge read';
            case 'replied': return 'status-badge replied';
            default: return 'status-badge';
        }
    };

    // Get subject text
    const getSubjectText = (subject) => {
        const subjects = {
            'certificate': 'Certificate Related',
            'scheme': 'Scheme Related',
            'complaint': 'Complaint',
            'water': 'Water Supply Issue',
            'road': 'Road Problem',
            'other': 'Other'
        };
        return subjects[subject] || subject;
    };

    // Filter complaints
    const filteredComplaints = filter === 'all'
        ? complaints
        : complaints.filter(c => c.status === filter);

    return (
        <div className="support-dashboard">
            {/* Header */}
            <div className="dashboard-header">
                <h1>
                    <i className="fas fa-headset"></i>
                    Support Dashboard
                </h1>
                <button className="refresh-btn" onClick={fetchComplaints}>
                    <i className="fas fa-sync-alt"></i> Refresh
                </button>
            </div>

            {/* Statistics Cards */}
            <div className="stats-cards">
                <div className="stat-card total" onClick={() => setFilter('all')}>
                    <div className="stat-icon">
                        <i className="fas fa-ticket-alt"></i>
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">{stats.total}</span>
                        <span className="stat-label">Total Tickets</span>
                    </div>
                </div>

                <div className="stat-card pending" onClick={() => setFilter('pending')}>
                    <div className="stat-icon">
                        <i className="fas fa-clock"></i>
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">{stats.pending}</span>
                        <span className="stat-label">Pending</span>
                    </div>
                </div>

                <div className="stat-card read" onClick={() => setFilter('read')}>
                    <div className="stat-icon">
                        <i className="fas fa-eye"></i>
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">{stats.read}</span>
                        <span className="stat-label">Read</span>
                    </div>
                </div>

                <div className="stat-card replied" onClick={() => setFilter('replied')}>
                    <div className="stat-icon">
                        <i className="fas fa-check-circle"></i>
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">{stats.replied}</span>
                        <span className="stat-label">Replied</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="dashboard-content">
                {/* Complaints List */}
                <div className="complaints-list-section">
                    <div className="list-header">
                        <h2>
                            {filter === 'all' ? 'All Tickets' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Tickets`}
                        </h2>
                        <span className="list-count">{filteredComplaints.length} items</span>
                    </div>

                    {loading ? (
                        <div className="loading-spinner">
                            <i className="fas fa-spinner fa-spin"></i> Loading...
                        </div>
                    ) : (
                        <div className="complaints-list">
                            {filteredComplaints.length === 0 ? (
                                <div className="no-data">
                                    <i className="fas fa-inbox"></i>
                                    <p>No complaints found</p>
                                </div>
                            ) : (
                                filteredComplaints.map(complaint => (
                                    <div
                                        key={complaint._id}
                                        className={`complaint-item ${selectedComplaint?._id === complaint._id ? 'active' : ''}`}
                                        onClick={() => setSelectedComplaint(complaint)}
                                    >
                                        <div className="complaint-header">
                                            <span className="ticket-id">{generateTicketId(complaint)}</span>
                                            <span className={getStatusBadge(complaint.status)}>
                                                {complaint.status}
                                            </span>
                                        </div>
                                        <div className="complaint-info">
                                            <h4>{complaint.name}</h4>
                                            <p className="complaint-subject">{getSubjectText(complaint.subject)}</p>
                                            <div className="complaint-meta">
                                                <span><i className="fas fa-phone"></i> {complaint.phone}</span>
                                                <span><i className="fas fa-calendar"></i> {formatDate(complaint.createdAt).split(',')[0]}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>

                {/* Complaint Details */}
                <div className="complaint-details-section">
                    {selectedComplaint ? (
                        <div className="complaint-details">
                            <div className="details-header">
                                <h3>Ticket Details</h3>
                                <div className="header-actions">
                                    <select
                                        value={selectedComplaint.status}
                                        onChange={(e) => updateStatus(selectedComplaint._id, e.target.value)}
                                        className="status-select"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="read">Mark as Read</option>
                                        <option value="replied">Mark as Replied</option>
                                    </select>
                                </div>
                            </div>

                            <div className="ticket-info">
                                <div className="info-row">
                                    <span className="info-label">Ticket ID:</span>
                                    <span className="info-value ticket-id-badge">{generateTicketId(selectedComplaint)}</span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Submitted on:</span>
                                    <span className="info-value">{formatDate(selectedComplaint.createdAt)}</span>
                                </div>
                            </div>

                            <div className="details-grid">
                                <div className="detail-item">
                                    <label>Name</label>
                                    <p>{selectedComplaint.name}</p>
                                </div>

                                <div className="detail-item">
                                    <label>Phone Number</label>
                                    <p>
                                        <a href={`tel:${selectedComplaint.phone}`}>
                                            {selectedComplaint.phone}
                                        </a>
                                    </p>
                                </div>

                                {selectedComplaint.email && (
                                    <div className="detail-item">
                                        <label>Email</label>
                                        <p>
                                            <a href={`mailto:${selectedComplaint.email}`}>
                                                {selectedComplaint.email}
                                            </a>
                                        </p>
                                    </div>
                                )}

                                <div className="detail-item full-width">
                                    <label>Subject</label>
                                    <p className="subject-text">{getSubjectText(selectedComplaint.subject)}</p>
                                </div>

                                <div className="detail-item full-width">
                                    <label>Message</label>
                                    <p className="message-text">{selectedComplaint.message}</p>
                                </div>

                                {selectedComplaint.imageUrl && (
                                    <div className="detail-item full-width">
                                        <label>Attached Image</label>
                                        <div className="image-preview">
                                            <img
                                                src={`http://https://checkirpala.onrender.com${selectedComplaint.imageUrl}`}
                                                alt="Complaint attachment"
                                                onClick={() => window.open(`http://https://checkirpala.onrender.com${selectedComplaint.imageUrl}`, '_blank')}
                                            />
                                            <a
                                                href={`http://https://checkirpala.onrender.com${selectedComplaint.imageUrl}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="view-image-btn"
                                            >
                                                <i className="fas fa-external-link-alt"></i> View Full Image
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="action-buttons">
                                <button
                                    className="action-btn whatsapp"
                                    onClick={() => window.open(`https://wa.me/91${selectedComplaint.phone}?text=Regarding your complaint: ${generateTicketId(selectedComplaint)}`, '_blank')}
                                >
                                    <i className="fab fa-whatsapp"></i> WhatsApp
                                </button>
                                <button
                                    className="action-btn call"
                                    onClick={() => window.location.href = `tel:${selectedComplaint.phone}`}
                                >
                                    <i className="fas fa-phone"></i> Call
                                </button>
                                {selectedComplaint.email && (
                                    <button
                                        className="action-btn email"
                                        onClick={() => window.location.href = `mailto:${selectedComplaint.email}`}
                                    >
                                        <i className="fas fa-envelope"></i> Email
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="no-selection">
                            <i className="fas fa-arrow-left"></i>
                            <p>Select a complaint to view details</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Support;