import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Bell, Check, Info, Rocket, Calendar, Leaf } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/notifications';

export default function NotificationDropdown() {
    const { token, isLoggedIn } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const dropdownRef = useRef(null);

    // Fetch notifications
    const fetchNotifications = async () => {
        if (!isLoggedIn || !token) return;
        try {
            setLoading(true);
            const res = await axios.get(API_BASE, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = res.data.data || [];
            setNotifications(data);
            setUnreadCount(data.filter(n => !n.read).length);
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            fetchNotifications();
            // Optional: Set up polling or WebSocket here for real-time updates
            const interval = setInterval(fetchNotifications, 60000); // Check every minute
            return () => clearInterval(interval);
        } else {
            setNotifications([]);
            setUnreadCount(0);
        }
    }, [isLoggedIn, token]);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const handleToggle = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            fetchNotifications(); // Refresh when opening
        }
    };

    const markAsRead = async (id) => {
        try {
            await axios.patch(`${API_BASE}/${id}/read`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Update local state optimally
            setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (error) {
            console.error('Failed to mark as read:', error);
        }
    };

    const markAllAsRead = async () => {
        if (unreadCount === 0) return;
        try {
            await axios.patch(`${API_BASE}/read-all`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
            setUnreadCount(0);
            toast.success('Tüm bildirimler okundu olarak işaretlendi.');
        } catch (error) {
            toast.error('Bildirimler işaretlenirken bir hata oluştu.');
        }
    };

    const getIcon = (type) => {
        switch (type) {
            case 'match': return <Rocket className="h-4 w-4 text-emerald-600" />;
            case 'social_update': return <Leaf className="h-4 w-4 text-teal-600" />;
            case 'listing_expiry': return <Calendar className="h-4 w-4 text-amber-600" />;
            default: return <Info className="h-4 w-4 text-blue-600" />;
        }
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('tr-TR', {
            hour: '2-digit',
            minute: '2-digit',
            day: 'numeric',
            month: 'short'
        }).format(date);
    };

    if (!isLoggedIn) return null;

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Bell Button */}
            <button
                onClick={handleToggle}
                className="relative p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                aria-label="Bildirimler"
            >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full animate-pulse"></span>
                )}
            </button>

            {/* Dropdown Panel */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-slate-100 z-50 overflow-hidden transform origin-top-right transition-all">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50">
                        <h3 className="text-sm font-bold text-slate-800">Bildirimler</h3>
                        {unreadCount > 0 && (
                            <button
                                onClick={markAllAsRead}
                                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                            >
                                <Check className="h-3 w-3" />
                                Tümünü Okundu İşaretle
                            </button>
                        )}
                    </div>

                    {/* Notification List */}
                    <div className="max-h-96 overflow-y-auto">
                        {loading && notifications.length === 0 ? (
                            <div className="p-8 text-center text-slate-400 text-sm">
                                Yükleniyor...
                            </div>
                        ) : notifications.length === 0 ? (
                            <div className="p-8 text-center flex flex-col items-center">
                                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                                    <Bell className="w-5 h-5 text-slate-300" />
                                </div>
                                <p className="text-sm font-medium text-slate-500">Henüz bir bildiriminiz yok.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-50">
                                {notifications.map(notif => (
                                    <div
                                        key={notif._id}
                                        onClick={() => { if (!notif.read) markAsRead(notif._id); }}
                                        className={`flex items-start gap-3 p-4 transition-colors cursor-pointer hover:bg-slate-50 ${
                                            !notif.read ? 'bg-emerald-50/30' : 'bg-white'
                                        }`}
                                    >
                                        <div className={`mt-0.5 p-2 rounded-full flex-shrink-0 ${
                                            notif.type === 'match' ? 'bg-emerald-100' :
                                            notif.type === 'social_update' ? 'bg-teal-100' :
                                            notif.type === 'listing_expiry' ? 'bg-amber-100' : 'bg-blue-100'
                                        }`}>
                                            {getIcon(notif.type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-sm leading-snug ${!notif.read ? 'font-bold text-slate-800' : 'font-medium text-slate-600'}`}>
                                                {notif.message}
                                            </p>
                                            <p className="text-[10px] font-semibold text-slate-400 mt-1">
                                                {formatTime(notif.createdAt)}
                                            </p>
                                        </div>
                                        {!notif.read && (
                                            <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
