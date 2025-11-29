'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Loader2 } from 'lucide-react';

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
];

export default function AddonsAdminPage() {
  const [addons, setAddons] = useState<AddOnService[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
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
        resetForm();
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
    setShowForm(true);
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

  const resetForm = () => {
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
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Loader2 className="w-8 h-8 text-ecospace-green animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Add-on Services</h1>
            <p className="text-gray-400">Manage additional services and add-ons</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-ecospace-green text-black rounded-xl font-semibold hover:bg-ecospace-green/90 transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            {showForm ? 'Cancel' : 'Add Addon'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingAddon ? 'Edit Addon' : 'New Addon'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-ecospace-green"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Slug</label>
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
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-ecospace-green"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Price (AED)</label>
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
                  <label className="block text-sm font-medium text-gray-300 mb-2">Icon</label>
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

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-8 py-3 bg-ecospace-green text-black rounded-xl font-semibold hover:bg-ecospace-green/90 transition-all"
                >
                  {editingAddon ? 'Update Addon' : 'Create Addon'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-8 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Addons List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {addons.map((addon) => (
            <div
              key={addon.id}
              className={`bg-white/5 border border-white/10 rounded-2xl p-6 ${
                !addon.isActive ? 'opacity-50' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-ecospace-green/20 text-ecospace-green text-xs rounded">
                      {addon.icon}
                    </span>
                    <span className="text-gray-500 text-xs">Order: {addon.sortOrder}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{addon.name}</h3>
                  <p className="text-gray-400 text-sm mb-3">{addon.description}</p>
                  <p className="text-2xl font-bold text-ecospace-green">{addon.price} AED</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleActive(addon)}
                  className="flex-1 p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all flex items-center justify-center gap-1"
                  title={addon.isActive ? 'Deactivate' : 'Activate'}
                >
                  {addon.isActive ? (
                    <>
                      <Eye className="w-4 h-4 text-ecospace-green" />
                      <span className="text-xs text-gray-300">Active</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-4 h-4 text-gray-500" />
                      <span className="text-xs text-gray-500">Inactive</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleEdit(addon)}
                  className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
                >
                  <Edit2 className="w-4 h-4 text-blue-400" />
                </button>
                <button
                  onClick={() => handleDelete(addon.id)}
                  className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {addons.length === 0 && !loading && (
          <div className="text-center py-16 bg-white/5 border border-white/10 rounded-2xl">
            <p className="text-gray-400">No addons found. Create your first addon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
