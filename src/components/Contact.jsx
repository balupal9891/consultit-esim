
export default function ContactPage() {
    return (
        <div className="text-black  flex justify-center items-center h-[90vh]" id='contact'>
            <form className="p-8 rounded-lg shadow-md w-full max-w-md bg-slate-100">
                <h2 className="text-2xl font-bold text-gray-800 text-center">Contact Us</h2>

                <div>
                    <label for="name" className="block text-gray-700 font-medium mb-1">Name</label>
                    <input type="text" name="name" required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div>
                    <label for="email" className="block text-gray-700 font-medium mb-1">Email</label>
                    <input type="email"  name="email" required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div>
                    <label for="message" className="block text-gray-700 font-medium mb-1">Message</label>
                    <textarea id="message" name="message" rows="4" required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>

                <button type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
                    Send Message
                </button>
            </form>
        </div>
      
    );
}