'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Star, Loader2 } from 'lucide-react';

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
  const [showForm, setShowForm] = useState(false);
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
        resetForm();
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
    setShowForm(true);
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

  const resetForm = () => {
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
            <h1 className="text-3xl font-bold text-white mb-2">Pricing Packages</h1>
            <p className="text-gray-400">Manage service packages and pricing</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-ecospace-green text-black rounded-xl font-semibold hover:bg-ecospace-green/90 transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            {showForm ? 'Cancel' : 'Add Package'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingPackage ? 'Edit Package' : 'New Package'}
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

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Price (AED)</label>
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
                  <label className="block text-sm font-medium text-gray-300 mb-2">Duration (hrs)</label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-ecospace-green"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Max People</label>
                  <input
                    type="number"
                    value={formData.maxPeople}
                    onChange={(e) => setFormData({ ...formData, maxPeople: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-ecospace-green"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
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
                <div className="flex flex-col gap-3">
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
                  <label className="block text-sm font-medium text-gray-300 mb-2">Features (one per line)</label>
                  <textarea
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-ecospace-green"
                    rows={6}
                    placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Not Included (one per line)</label>
                  <textarea
                    value={formData.notIncluded}
                    onChange={(e) => setFormData({ ...formData, notIncluded: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-ecospace-green"
                    rows={6}
                    placeholder="Not included 1&#10;Not included 2"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-8 py-3 bg-ecospace-green text-black rounded-xl font-semibold hover:bg-ecospace-green/90 transition-all"
                >
                  {editingPackage ? 'Update Package' : 'Create Package'}
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

        {/* Packages List */}
        <div className="grid grid-cols-1 gap-4">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-white/5 border border-white/10 rounded-2xl p-6 ${
                !pkg.isActive ? 'opacity-50' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                    {pkg.isPopular && (
                      <span className="px-2 py-1 bg-ecospace-green text-black text-xs font-bold rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        POPULAR
                      </span>
                    )}
                    <span className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded-full">
                      {pkg.category}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-4">{pkg.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <span className="text-gray-500 text-sm">Price:</span>
                      <p className="text-white font-semibold">{pkg.price} AED</p>
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm">Duration:</span>
                      <p className="text-white font-semibold">{pkg.duration} hrs</p>
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm">Max People:</span>
                      <p className="text-white font-semibold">{pkg.maxPeople}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm">Sort Order:</span>
                      <p className="text-white font-semibold">{pkg.sortOrder}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Features:</p>
                      <ul className="text-gray-300 text-sm space-y-1">
                        {pkg.features.map((f, i) => (
                          <li key={i}>• {f}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleActive(pkg)}
                    className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
                    title={pkg.isActive ? 'Deactivate' : 'Activate'}
                  >
                    {pkg.isActive ? (
                      <Eye className="w-5 h-5 text-ecospace-green" />
                    ) : (
                      <EyeOff className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  <button
                    onClick={() => handleEdit(pkg)}
                    className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
                  >
                    <Edit2 className="w-5 h-5 text-blue-400" />
                  </button>
                  <button
                    onClick={() => handleDelete(pkg.id)}
                    className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
                  >
                    <Trash2 className="w-5 h-5 text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {packages.length === 0 && !loading && (
          <div className="text-center py-16 bg-white/5 border border-white/10 rounded-2xl">
            <p className="text-gray-400">No packages found. Create your first package!</p>
          </div>
        )}
      </div>
    </div>
  );
}
