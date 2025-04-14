import React, { useState } from 'react';
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  Trash2,
  MessageCircle,
  Search,
  Filter,
  X,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Review {
  id: string;
  product_name: string;
  customer_name: string;
  rating: number;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  admin_response?: string;
  created_at: string;
}

const mockReviews: Review[] = [
  {
    id: '1',
    product_name: 'iPhone 13',
    customer_name: 'John Doe',
    rating: 4,
    comment: 'Great phone with amazing camera quality!',
    status: 'pending',
    created_at: '2025-04-08T10:30:00Z',
  },
  {
    id: '2',
    product_name: 'Nike Air Max',
    customer_name: 'Jane Smith',
    rating: 5,
    comment: 'Most comfortable shoes I\'ve ever worn!',
    status: 'approved',
    admin_response: 'Thank you for your positive feedback!',
    created_at: '2025-04-07T15:45:00Z',
  },
  {
    id: '3',
    product_name: 'Sony Headphones',
    customer_name: 'Mike Johnson',
    rating: 2,
    comment: 'Battery life is not as advertised.',
    status: 'rejected',
    created_at: '2025-04-06T09:20:00Z',
  },
];

export default function ManageReviews() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [ratingFilter, setRatingFilter] = useState<string>('all');
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [adminResponse, setAdminResponse] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);

  const handleStatusChange = (reviewId: string, newStatus: 'approved' | 'rejected') => {
    const updatedReviews = reviews.map((review) =>
      review.id === reviewId ? { ...review, status: newStatus } : review
    );
    setReviews(updatedReviews);
    toast.success(`Review ${newStatus} successfully!`);
  };

  const handleDeleteReview = (reviewId: string) => {
    setReviews(reviews.filter((review) => review.id !== reviewId));
    toast.success('Review deleted successfully!');
  };

  const handleResponseSubmit = () => {
    if (selectedReview) {
      const updatedReviews = reviews.map((review) =>
        review.id === selectedReview.id
          ? { ...review, admin_response: adminResponse }
          : review
      );
      setReviews(updatedReviews);
      setShowResponseModal(false);
      setSelectedReview(null);
      setAdminResponse('');
      toast.success('Response submitted successfully!');
    }
  };

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.customer_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || review.status === statusFilter;
    const matchesRating =
      ratingFilter === 'all' || review.rating === parseInt(ratingFilter);
    return matchesSearch && matchesStatus && matchesRating;
  });

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Reviews</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search reviews..."
              className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="border rounded-md px-3 py-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <select
            className="border rounded-md px-3 py-2"
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Comment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredReviews.map((review) => (
              <tr key={review.id}>
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      setSelectedReview(review);
                      setShowDetailModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {review.product_name}
                  </button>
                </td>
                <td className="px-6 py-4">{review.customer_name}</td>
                <td className="px-6 py-4">
                  <StarRating rating={review.rating} />
                </td>
                <td className="px-6 py-4">
                  <p className="truncate max-w-xs">{review.comment}</p>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      review.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : review.status === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {new Date(review.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleStatusChange(review.id, 'approved')}
                      className="text-green-600 hover:text-green-900"
                      title="Approve review"
                    >
                      <ThumbsUp className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleStatusChange(review.id, 'rejected')}
                      className="text-red-600 hover:text-red-900"
                      title="Reject review"
                    >
                      <ThumbsDown className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedReview(review);
                        setShowResponseModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-900"
                      title="Respond to review"
                    >
                      <MessageCircle className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete review"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Response Modal */}
      {showResponseModal && selectedReview && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Respond to Review</h3>
              <button
                onClick={() => {
                  setShowResponseModal(false);
                  setSelectedReview(null);
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Responding to {selectedReview.customer_name}'s review of{' '}
                {selectedReview.product_name}
              </p>
              <div className="mt-2 p-3 bg-gray-50 rounded">
                <StarRating rating={selectedReview.rating} />
                <p className="mt-2">{selectedReview.comment}</p>
              </div>
            </div>
            <textarea
              className="w-full p-2 border rounded-md"
              rows={4}
              placeholder="Type your response..."
              value={adminResponse}
              onChange={(e) => setAdminResponse(e.target.value)}
            />
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowResponseModal(false);
                  setSelectedReview(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleResponseSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Submit Response
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedReview && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Review Details</h3>
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedReview(null);
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Product</h4>
                <p className="mt-1 text-lg">{selectedReview.product_name}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Customer</h4>
                <p className="mt-1">{selectedReview.customer_name}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Rating</h4>
                <div className="mt-1">
                  <StarRating rating={selectedReview.rating} />
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Review</h4>
                <p className="mt-1">{selectedReview.comment}</p>
              </div>
              {selectedReview.admin_response && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Admin Response</h4>
                  <p className="mt-1 p-3 bg-gray-50 rounded">
                    {selectedReview.admin_response}
                  </p>
                </div>
              )}
              <div>
                <h4 className="text-sm font-medium text-gray-500">Status</h4>
                <span
                  className={`mt-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    selectedReview.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : selectedReview.status === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {selectedReview.status.charAt(0).toUpperCase() +
                    selectedReview.status.slice(1)}
                </span>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Submitted On</h4>
                <p className="mt-1">
                  {new Date(selectedReview.created_at).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedReview(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}