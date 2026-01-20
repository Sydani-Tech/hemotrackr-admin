import { useState } from "react";
import { ArrowLeft, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    // Handle submission logic here
    console.log({ rating, comment });
    navigate("/donor/dashboard");
  };

  return (
    <div className="flex gap-8 items-start">
      {/* Main Content */}
      <div className="flex-1 bg-white rounded-3xl p-8 shadow-sm min-h-[600px] border border-blue-500">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white hover:bg-gray-800 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="max-w-xl mx-auto mt-8">
          <h1 className="text-3xl font-serif text-blue-600 mb-2">
            Rate your experience
          </h1>
          <p className="text-gray-500 mb-8">How was your last donation?</p>

          {/* Star Rating */}
          <div className="flex gap-6 mb-12">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(star)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <Star
                  className={`w-10 h-10 ${
                    star <= (hoveredRating || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-yellow-400"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
            ))}
          </div>

          {/* Comment Box */}
          <div className="mb-8">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3 block">
              PLEASE LEAVE A COMMENT
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full h-40 bg-gray-50 rounded-xl border border-gray-100 p-4 text-gray-600 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder=""
            />
          </div>

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white w-32 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 space-y-8">
        {/* Ad Card */}
        <div className="bg-gray-900 rounded-2xl overflow-hidden relative shadow-xl h-48">
          <div className="absolute inset-0 bg-linear-to-r from-black/80 to-transparent z-10" />
          <img
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop"
            className="w-full h-full object-cover"
            alt="Doctor"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
            <p className="text-[10px] font-bold uppercase tracking-wider mb-2 text-blue-400">
              FREE MEDICAL TEST
            </p>
            <h3 className="font-bold text-sm mb-4 leading-tight">
              Get your free medical test at HTPS Hospital
            </h3>
            <button className="bg-white text-gray-900 text-[10px] font-bold px-3 py-1.5 rounded">
              Click to find out more.
            </button>
          </div>
        </div>

        {/* Share */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4">Share</h3>
          <div className="flex gap-4 text-gray-400">
            <a href="#" className="hover:text-blue-600 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a href="#" className="hover:text-black transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href="#" className="hover:text-gray-600 transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
