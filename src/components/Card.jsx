function Card({ title, description }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition">
      <h3 className="text-xl font-bold text-green-700 mb-3">
        {title}
      </h3>

      <p className="text-gray-600">
        {description}
      </p>

      <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
        Learn More
      </button>
    </div>
  );
}

export default Card;