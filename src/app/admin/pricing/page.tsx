'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Star, Loader2, X, DollarSign, Clock, Users } from 'lucide-react';

interface ServicePackage {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  features: string[];
  notIncluded: string[];
  duration: number;
  maxPeople: number;
  isPopular: boolean;
  isActive: boolean;
  sortOrder: number;
  category: string;
}

export default function PricingAdminPage() {
  const [packages, setPackages] = useState<ServicePackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState<ServicePackage | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    originalPrice: '',
    features: '',
    notIncluded: '',
    duration: '1',
    maxPeople: '5',
    isPopular: false,
    isActive: true,
    sortOrder: '0',
    category: 'recording-only',
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await fetch('/api/services?includeInactive=true');
      const data = await response.json();
      if (data.success) {
        setPackages(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      features: formData.features.split('\n').filter(f => f.trim()),
      notIncluded: formData.notIncluded.split('\n').filter(f => f.trim()),
      duration: parseInt(formData.duration),
      maxPeople: parseInt(formData.maxPeople),
      sortOrder: parseInt(formData.sortOrder),
    };

    try {
      const method = editingPackage ? 'PATCH' : 'POST';
      const body = editingPackage ? { id: editingPackage.id, ...payload } : payload;

      const response = await fetch('/api/services', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (data.success) {
        fetchPackages();
        closeModal();
      } else {
        alert(data.error || 'Failed to save package');
      }
    } catch (error) {
      console.error('Error saving package:', error);
      alert('Failed to save package');
    }
  };

  const handleEdit = (pkg: ServicePackage) => {
    setEditingPackage(pkg);
    setFormData({
      name: pkg.name,
      slug: pkg.slug,
      description: pkg.description,
      price: pkg.price.toString(),
      originalPrice: pkg.originalPrice?.toString() || '',
      features: pkg.features.join('\n'),
      notIncluded: pkg.notIncluded.join('\n'),
      duration: pkg.duration.toString(),
      maxPeople: pkg.maxPeople.toString(),
      isPopular: pkg.isPopular,
      isActive: pkg.isActive,
      sortOrder: pkg.sortOrder.toString(),
      category: pkg.category,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this package?')) return;

    try {
      const response = await fetch(`/api/services?id=${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (data.success) {
        fetchPackages();
      } else {
        alert(data.error || 'Failed to delete package');
      }
    } catch (error) {
      console.error('Error deleting package:', error);
      alert('Failed to delete package');
    }
  };

  const toggleActive = async (pkg: ServicePackage) => {
    try {
      const response = await fetch('/api/services', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: pkg.id, isActive: !pkg.isActive }),
      });
      const data = await response.json();
      if (data.success) {
        fetchPackages();
      }
    } catch (error) {
      console.error('Error toggling package:', error);
    }
  };

  const closeModal = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      price: '',
      originalPrice: '',
      features: '',
      notIncluded: '',
      duration: '1',
      maxPeople: '5',
      isPopular: false,
      isActive: true,
      sortOrder: '0',
      category: 'recording-only',
    });
    setEditingPackage(null);
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
          <h1 className="text-3xl font-bold text-white mb-2">Pricing Packages</h1>
          <p className="text-gray-400">Manage service packages and pricing</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-ecospace-green text-black rounded-xl font-semibold hover:bg-ecospace-green/90 transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Package
        </button>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => {
          const savings = pkg.originalPrice ? pkg.originalPrice - pkg.price : 0;

          return (
            <div
              key={pkg.id}
              className={`relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-ecospace-green/30 transition-all ${
                !pkg.isActive ? 'opacity-50' : ''
              }`}
            >
              {/* Popular & Status Badges */}
              <div className="flex items-center gap-2 mb-4">
                {pkg.isPopular && (
                  <span className="px-2 py-1 bg-ecospace-green text-black text-xs font-bold rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    POPULAR
                  </span>
                )}
                <span className={`px-2 py-1 text-xs rounded-full ${
                  pkg.isActive
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                }`}>
                  {pkg.isActive ? 'Active' : 'Inactive'}
                </span>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full border border-blue-500/30">
                  {pkg.category}
                </span>
              </div>

              {/* Package Name */}
              <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{pkg.description}</p>

              {/* Price */}
              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <DollarSign className="w-5 h-5 text-ecospace-green" />
                  <span className="text-3xl font-bold text-white">{pkg.price}</span>
                  <span className="text-gray-400">AED</span>
                </div>
                {pkg.originalPrice && savings > 0 && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-gray-500 line-through text-sm">{pkg.originalPrice} AED</span>
                    <span className="text-ecospace-green text-xs font-semibold">Save {savings} AED</span>
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{pkg.duration}h</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{pkg.maxPeople}</span>
                </div>
              </div>

              {/* Features Preview */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Features</p>
                <ul className="space-y-1">
                  {pkg.features.slice(0, 3).map((feature, i) => (
                    <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                      <span className="text-ecospace-green">•</span>
                      <span className="line-clamp-1">{feature}</span>
                    </li>
                  ))}
                  {pkg.features.length > 3 && (
                    <li className="text-sm text-gray-500">+{pkg.features.length - 3} more</li>
                  )}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-white/10">
                <button
                  onClick={() => toggleActive(pkg)}
                  className="flex-1 p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all flex items-center justify-center gap-1"
                  title={pkg.isActive ? 'Deactivate' : 'Activate'}
                >
                  {pkg.isActive ? (
                    <Eye className="w-4 h-4 text-ecospace-green" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-gray-500" />
                  )}
                </button>
                <button
                  onClick={() => handleEdit(pkg)}
                  className="flex-1 p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all flex items-center justify-center gap-1"
                >
                  <Edit2 className="w-4 h-4 text-blue-400" />
                </button>
                <button
                  onClick={() => handleDelete(pkg.id)}
                  className="flex-1 p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all flex items-center justify-center gap-1"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {packages.length === 0 && (
        <div className="text-center py-16 bg-white/5 border border-white/10 rounded-2xl">
          <p className="text-gray-400">No packages found. Create your first package!</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 sticky top-0 bg-gray-900 z-10">
              <h2 className="text-2xl font-bold text-white">
                {editingPackage ? 'Edit Package' : 'New Package'}
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

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Price (AED) *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-ecospace-green"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Original Price</label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-ecospace-green"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Duration (hrs) *</label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-ecospace-green"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Max People *</label>
                  <input
                    type="number"
                    value={formData.maxPeople}
                    onChange={(e) => setFormData({ ...formData, maxPeople: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-ecospace-green"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-ecospace-green"
                  >
                    <option value="recording-only">Recording Only</option>
                    <option value="podcast-editing">Podcast Editing</option>
                    <option value="studio-rental">Studio Rental</option>
                    <option value="reels">Reels</option>
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
                <div className="flex flex-col gap-3 justify-center">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isPopular}
                      onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                      className="w-5 h-5 rounded bg-white/10 border-white/20 text-ecospace-green focus:ring-ecospace-green"
                    />
                    <span className="text-sm text-gray-300">Popular</span>
                  </label>
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Features (one per line) *</label>
                  <textarea
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-ecospace-green font-mono text-sm"
                    rows={8}
                    placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Not Included (one per line)</label>
                  <textarea
                    value={formData.notIncluded}
                    onChange={(e) => setFormData({ ...formData, notIncluded: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-ecospace-green font-mono text-sm"
                    rows={8}
                    placeholder="Not included 1&#10;Not included 2"
                  />
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex gap-4 pt-4 border-t border-white/10">
                <button
                  type="submit"
                  className="flex-1 px-8 py-3 bg-ecospace-green text-black rounded-xl font-semibold hover:bg-ecospace-green/90 transition-all"
                >
                  {editingPackage ? 'Update Package' : 'Create Package'}
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
