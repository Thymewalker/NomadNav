export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">
            Tailwind CSS Test
          </h1>
          
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Primary Button
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Secondary Button
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-700">Card 1</h2>
              <p className="text-gray-600">Testing Tailwind styles</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-700">Card 2</h2>
              <p className="text-gray-600">Testing Tailwind styles</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 