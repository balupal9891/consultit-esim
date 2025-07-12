export default function EsimGuidePage() {
  return (
    <div className="text-black bg-gray-50 py-12 px-6 space-y-16">
      {/* eSIM Compatibility Check */}
      <section className="max-w-5xl mx-auto text-center border">
        <h2 className="text-3xl font-bold mb-4">How to check Global eSIM Compatibility?</h2>
        <ul className="text-lg space-y-2 text-left max-w-xl mx-auto">
          <li>✅ Dial <strong>*#06#</strong> and press call</li>
          <li>✅ Check for the device’s eSIM EID (unique identification number)</li>
          <li>✅ If visible, your phone is eSIM compatible</li>
        </ul>
        <button className="mt-6 px-6 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700">
          READ MORE
        </button>
      </section>

      {/* How to Install Matrix eSIM on iPhone */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">How to Install eSIM in iPhone?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-sm">
          <div>
            <img src="/path/to/image1.png" alt="Open Settings" className="rounded-lg mb-2" />
            <h4 className="font-medium">Open Settings</h4>
            <p>Open settings and look for Mobile Services</p>
          </div>
          <div>
            <img src="/path/to/image2.png" alt="Go to Mobile Service" className="rounded-lg mb-2" />
            <h4 className="font-medium">Go to Mobile Service</h4>
            <p>See "Add eSIM" in mobile service settings</p>
          </div>
          <div>
            <img src="/path/to/image3.png" alt="Setup Mobile Service" className="rounded-lg mb-2" />
            <h4 className="font-medium">Setup Mobile Services</h4>
            <p>Use the QR Code option to activate eSIM</p>
          </div>
          <div>
            <img src="/path/to/image4.png" alt="Open Photos" className="rounded-lg mb-2" />
            <h4 className="font-medium">Open Photos</h4>
            <p>Open your QR code image to scan it</p>
          </div>
        </div>
      </section>

      {/* Activation Steps */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">How to activate eSIM?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center text-sm">
          {[
            {
              title: "Order SIM/eSIM",
              desc: "Choose your plan, complete the payment, and receive confirmation via email.",
            },
            {
              title: "Receive SIM/eSIM",
              desc: "Get your physical SIM or eSIM QR via email with setup instructions.",
            },
            {
              title: "Complete KYC",
              desc: "Upload documents via email link to verify your identity per DOT rules.",
            },
            {
              title: "Activated",
              desc: "Once KYC is verified, your SIM will be activated in about 10 minutes.",
            },
          ].map((item, idx) => (
            <div key={idx} className="p-4 border rounded-lg">
              <div className="w-12 h-12 bg-blue-100 mx-auto rounded-full mb-3"></div>
              <h4 className="font-semibold mb-1">{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Global SIM Advantages */}
      <section className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">Experience the advantages of Global International SIM Card</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-sm">
          <div>
            <h4 className="font-medium mb-1">Ease of Purchase</h4>
            <p>Seamless connectivity with just a few clicks.</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">Retain Existing SIM</h4>
            <p>Keep your number and WhatsApp without change.</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">Save on Roaming</h4>
            <p>Avoid costly roaming with affordable eSIM plans.</p>
          </div>
        </div>
      </section>

      {/* Global eSIM Advantages */}
      <section className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">Experience the advantages of Global eSIM</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-sm">
          <div>
            <h4 className="font-medium mb-1">No SIM Swapping</h4>
            <p>Activate or switch without physical SIM cards.</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">QR Code on Email</h4>
            <p>Activate your eSIM by scanning a QR from email.</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">No Physical Store</h4>
            <p>Skip store visits. Activate your plan instantly.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
