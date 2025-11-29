'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Loader2, X } from 'lucide-react';

interface AddOnService {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  icon: string;
  isActive: boolean;
  sortOrder: number;
}

const availableIcons = [
  'Camera',
  'Film',
  'Palette',
  'Clock',
  'Music',
  'Users',
  'Mic',
  'Video',
  'FileText',
  'Headphones',
  'Sparkles',
  'Zap',
];

export default function AddonsAdminPage() {
  const [addons, setAddons] = useState<AddOnService[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAddon, setEditingAddon] = useState<AddOnService | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    icon: 'Camera',
    isActive: true,
    sortOrder: '0',
  });

  useEffect(() => {
    fetchAddons();
  }, []);

  const fetchAddons = async () => {
    try {
      const response = await fetch('/api/addons?includeInactive=true');
      const data = await response.json();
      if (data.success) {
        setAddons(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch addons:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      sortOrder: parseInt(formData.sortOrder),
    };

    try {
      const method = editingAddon ? 'PATCH' : 'POST';
      const body = editingAddon ? { id: editingAddon.id, ...payload } : payload;

      const response = await fetch('/api/addons', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (data.success) {
        fetchAddons();
        closeModal();
      } else {
        alert(data.error || 'Failed to save addon');
      }
    } catch (error) {
      console.error('Error saving addon:', error);
      alert('Failed to save addon');
    }
  };

  const handleEdit = (addon: AddOnService) => {
    setEditingAddon(addon);
    setFormData({
      name: addon.name,
      slug: addon.slug,
      description: addon.description,
      price: addon.price.toString(),
      icon: addon.icon,
      isActive: addon.isActive,
      sortOrder: addon.sortOrder.toString(),
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this addon?')) return;

    try {
      const response = await fetch(`/api/addons?id=${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (data.success) {
        fetchAddons();
      } else {
        alert(data.error || 'Failed to delete addon');
      }
    } catch (error) {
      console.error('Error deleting addon:', error);
      alert('Failed to delete addon');
    }
  };

  const toggleActive = async (addon: AddOnService) => {
    try {
      const response = await fetch('/api/addons', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: addon.id, isActive: !addon.isActive }),
      });
      const data = await response.json();
      if (data.success) {
        fetchAddons();
      }
    } catch (error) {
      console.error('Error toggling addon:', error);
    }
  };

  const closeModal = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      price: '',
      icon: 'Camera',
      isActive: true,
      sortOrder: '0',
    });
    setEditingAddon(null);
    setShowModal(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 text-ecospace-green animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Add-on Services</h1>
          <p className="text-gray-400">Manage additional services and add-ons</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-ecospace-green text-black rounded-xl font-semibold hover:bg-ecospace-green/90 transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Addon
        </button>
      </div>

      {/* Addons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {addons.map((addon) => (
          <div
            key={addon.id}
            className={`relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-ecospace-green/30 transition-all ${
              !addon.isActive ? 'opacity-50' : ''
            }`}
          >
            {/* Status Badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className={`px-2 py-1 text-xs rounded-full ${
                addon.isActive
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
              }`}>
                {addon.isActive ? 'Active' : 'Inactive'}
              </span>
              <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full border border-purple-500/30">
                {addon.icon}
              </span>
              <span className="ml-auto text-xs text-gray-500">
                Order: {addon.sortOrder}
              </span>
            </div>

            {/* Addon Name */}
            <h3 className="text-lg font-bold text-white mb-2">{addon.name}</h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{addon.description}</p>

            {/* Price */}
            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">{addon.price}</span>
                <span className="text-gray-400 text-sm">AED</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4 border-t border-white/10">
              <button
                onClick={() => toggleActive(addon)}
                className="flex-1 p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all flex items-center justify-center gap-1"
                title={addon.isActive ? 'Deactivate' : 'Activate'}
              >
                {addon.isActive ? (
                  <Eye className="w-4 h-4 text-ecospace-green" />
                ) : (
                  <EyeOff className="w-4 h-4 text-gray-500" />
                )}
              </button>
              <button
                onClick={() => handleEdit(addon)}
                className="flex-1 p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all flex items-center justify-center gap-1"
              >
                <Edit2 className="w-4 h-4 text-blue-400" />
              </button>
              <button
                onClick={() => handleDelete(addon.id)}
                className="flex-1 p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all flex items-center justify-center gap-1"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {addons.length === 0 && (
        <div className="text-center py-16 bg-white/5 border border-white/10 rounded-2xl">
          <p className="text-gray-400">No addons found. Create your first addon!</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 sticky top-0 bg-gray-900 z-10">
              <h2 className="text-2xl font-bold text-white">
                {editingAddon ? 'Edit Addon' : 'New Addon'}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-white/10 rounded-lg transition-all"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-ecospace-green"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Slug *</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-ecospace-green"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-ecospace-green"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Price (AED) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-ecospace-green"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Icon *</label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-ecospace-green"
                  >
                    {availableIcons.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Sort Order</label>
                  <input
                    type="number"
                    value={formData.sortOrder}
                    onChange={(e) => setFormData({ ...formData, sortOrder: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-ecospace-green"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-5 h-5 rounded bg-white/10 border-white/20 text-ecospace-green focus:ring-ecospace-green"
                  />
                  <span className="text-sm text-gray-300">Active</span>
                </label>
              </div>

              {/* Modal Actions */}
              <div className="flex gap-4 pt-4 border-t border-white/10">
                <button
                  type="submit"
                  className="flex-1 px-8 py-3 bg-ecospace-green text-black rounded-xl font-semibold hover:bg-ecospace-green/90 transition-all"
                >
                  {editingAddon ? 'Update Addon' : 'Create Addon'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-8 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
