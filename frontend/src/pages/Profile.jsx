import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';
import { HiUser, HiMail, HiLockClosed, HiTrash, HiExclamation } from 'react-icons/hi';

const Profile = () => {
    const { user, updateUser, logout } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showDelete, setShowDelete] = useState(false);
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [loadingPassword, setLoadingPassword] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoadingProfile(true);
        try {
            const { data } = await api.put('/user/profile', { name, email });
            if (data.success) {
                updateUser(data.user);
                toast.success('Profile updated successfully');
            }
        } catch (error) {
            toast.error(error.message || 'Failed to update profile');
        } finally {
            setLoadingProfile(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        setLoadingPassword(true);
        try {
            const { data } = await api.post('/user/change-password', { currentPassword, newPassword });
            if (data.success) {
                toast.success('Password changed successfully');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            }
        } catch (error) {
            toast.error(error.message || 'Failed to change password');
        } finally {
            setLoadingPassword(false);
        }
    };

    const handleDeleteAccount = async () => {
        setLoadingDelete(true);
        try {
            const { data } = await api.delete('/user/delete');
            if (data.success) {
                toast.success('Account deleted');
                await logout();
                navigate('/');
            }
        } catch (error) {
            toast.error(error.message || 'Failed to delete account');
        } finally {
            setLoadingDelete(false);
        }
    };

    return (
        <div className="page-container">
            <div className="section-container max-w-2xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyber-cyan to-cyber-blue flex items-center justify-center text-cyber-dark text-2xl font-bold">
                        {user?.name?.charAt(0)?.toUpperCase()}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold gradient-text">{user?.name}</h1>
                        <p className="text-sm text-cyber-muted">{user?.email}</p>
                    </div>
                </div>

                {/* Profile Update */}
                <form onSubmit={handleUpdateProfile} className="glass-card p-6 mb-6">
                    <h2 className="text-lg font-semibold mb-5">Profile Information</h2>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="profile-name" className="cyber-label">Name</label>
                            <div className="relative">
                                <HiUser className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyber-muted" />
                                <input
                                    id="profile-name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="cyber-input !pl-11"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="profile-email" className="cyber-label">Email</label>
                            <div className="relative">
                                <HiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyber-muted" />
                                <input
                                    id="profile-email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="cyber-input !pl-11"
                                />
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loadingProfile}
                        className="mt-5 cyber-button-primary disabled:opacity-50"
                    >
                        {loadingProfile ? 'Saving...' : 'Save Changes'}
                    </button>
                </form>

                {/* Change Password */}
                <form onSubmit={handleChangePassword} className="glass-card p-6 mb-6">
                    <h2 className="text-lg font-semibold mb-5">Change Password</h2>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="current-password" className="cyber-label">Current Password</label>
                            <div className="relative">
                                <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyber-muted" />
                                <input
                                    id="current-password"
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="cyber-input !pl-11"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="new-password" className="cyber-label">New Password</label>
                            <div className="relative">
                                <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyber-muted" />
                                <input
                                    id="new-password"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="cyber-input !pl-11"
                                    minLength={6}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="confirm-new-password" className="cyber-label">Confirm New Password</label>
                            <div className="relative">
                                <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyber-muted" />
                                <input
                                    id="confirm-new-password"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="cyber-input !pl-11"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loadingPassword}
                        className="mt-5 cyber-button-primary disabled:opacity-50"
                    >
                        {loadingPassword ? 'Changing...' : 'Change Password'}
                    </button>
                </form>

                {/* Delete Account */}
                <div className="glass-card p-6 border-l-4 border-cyber-red">
                    <h2 className="text-lg font-semibold text-cyber-red mb-2">Danger Zone</h2>
                    <p className="text-sm text-cyber-muted mb-4">
                        Once you delete your account, there is no going back. All your data will be permanently removed.
                    </p>
                    {!showDelete ? (
                        <button
                            onClick={() => setShowDelete(true)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-cyber-red text-cyber-red hover:bg-cyber-red/10 transition-all duration-300 text-sm font-medium"
                        >
                            <HiTrash className="w-4 h-4" />
                            Delete Account
                        </button>
                    ) : (
                        <div className="bg-cyber-red/5 rounded-lg p-4 border border-cyber-red/30">
                            <div className="flex items-center gap-2 mb-3">
                                <HiExclamation className="w-5 h-5 text-cyber-red" />
                                <p className="text-sm font-medium text-cyber-red">Are you sure?</p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleDeleteAccount}
                                    disabled={loadingDelete}
                                    className="px-4 py-2 rounded-lg bg-cyber-red text-white text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
                                >
                                    {loadingDelete ? 'Deleting...' : 'Yes, Delete'}
                                </button>
                                <button
                                    onClick={() => setShowDelete(false)}
                                    className="px-4 py-2 rounded-lg border border-cyber-border text-cyber-muted text-sm hover:bg-white/5 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
