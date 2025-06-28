const Unauthorized = () => {
    return(
      <div className="min-h-screen flex items-center justify-center bg-red-50">
          <div className="text-center">
              <h1 className="text-4xl font-bold text-red-700">
                  401 - Unauthorized
              </h1>
              <p className="text-gray-600 mt-2">
                  You don't have permission to access this page.
              </p>
          </div>
      </div>
    );
}

export default Unauthorized;