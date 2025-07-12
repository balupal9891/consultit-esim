import React, { useEffect } from "react";

const KYCPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="p-8" style ={{
    
      maxWidth: '1000px',
      margin: '40px auto',
      padding: '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#f9f9f9',
      borderRadius: '12px',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.30)'
    }}>
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>

      <p><strong>Introduction</strong><br />
      Esim Cellular International Services Pvt Ltd. (“Esim”, “we” or “us”) takes the privacy of your information seriously. This Privacy Policy applies to the Esim.in website (the “Website”) and governs data collection, processing and usage in compliance with the Indian Laws. By using the Website, you consent to the data practices described in this statement. Capitalized terms that are not defined in this Privacy Policy have the meaning given to them in our Terms of Service.</p><br />

      <p><strong>Information Collected from All Visitors to our Website</strong><br />
      We will obtain personal data about you when you visit us. When you visit us, we may monitor the use of this Website through the use of cookies and similar tracking devices. For example, we may monitor the number of times you visit our Website or which pages you go to. This information helps us to build a profile of our users. Some of this data will be aggregated or statistical, which means that we will not be able to identify you individually.<br />
      This Privacy Policy applies to all visitors to our Website.</p><br />

      <p><strong>Additional Personal Information that May be Collected</strong><br />
      Esim may collect and process:</p>
      <ol className="list-decimal list-inside ml-6">
        <li>Your e-mail address and name, when you contact us.</li>
        <li>Details contained in the relevant document that you key in when you use our Services. These details may include your name, phone number, email, your address, and details about your payments.</li>
        <li>Information about your computer hardware and software when you use our Website. The information can include: your IP address, browser type, domain names, access times and referring website addresses.</li>
      </ol><br />

      <p><strong>Use of Personal Information</strong><br />
      Esim uses the collected information:</p>
      <ol className="list-decimal list-inside ml-6">
        <li>To operate the Website and deliver the Services.</li>
        <li>To process, and where necessary, respond to your application form for SIM card, enquiry or request.</li>
        <li>To gather customer feedback.</li>
        <li>To inform or update you of other products or services available from Esim and its affiliates.</li>
        <li>To monitor, improve and administer the Website and Services, and to provide general statistics.</li>
        <li>To update you on changes to the Website and Services.</li>
      </ol><br />

      <p><strong>Non-disclosure</strong><br />
      Esim does not sell, rent, lease, or release your Personal Information to third parties. We may contact you on behalf of external business partners about an offering that may interest you, but your information is not transferred without your explicit consent. We may also share data with trusted partners to help with statistical analysis, email, or support services.</p><br />

      <p><strong>Disclosure of Personal Information</strong><br />
      Esim will disclose your information only if required by law or in good faith belief such action is necessary. We may disclose personal information in the event of a business transfer or acquisition.</p><br />

      <p><strong>Use Of Cookies</strong><br />
      Cookies are used to personalize your experience, perform analytics, and show relevant ads. You can control cookies through your browser settings. The Website uses Google Analytics. Refer to <a href="http://www.google.com/policies/privacy/partners">Google Policies</a> for more information.</p><br />

      <p><strong>Security Of Your Personal Information</strong><br />
      We strive to protect your information through encryption and secure procedures. However, transmission over the Internet is not completely secure.</p><br />

      <p><strong>Access to, Updating, and Non-Use of Your Personal Information</strong><br />
      You have the right to request, correct, or delete your personal data. You can notify us at <a href="mailto:support@Esim.in">support@Esim.in</a>.</p><br />

      <p><strong>Links to Other Websites</strong><br />
      Our Website may link to external websites. We are not responsible for their privacy practices.</p><br />

      <p><strong>Changes To This Statement</strong><br />
      Esim may update this Privacy Policy periodically. Please review it regularly.</p><br />

      <p><strong>Contact Information</strong><br />
      For queries regarding this policy, contact us at <a href="mailto:support@Esim.in">support@Esim.in</a>.</p><br />

      <h2 className="text-2xl font-bold mt-10 mb-4 text-center">KYC Rules</h2>
      <p>The Department of Telecommunication (DOT) India has mandated all companies involved in sale/rental of International SIM Cards/Global Calling Cards must conduct proper KYC formalities. The objective herein is to ascertain the true identity of the customer and to prevent misuse of the telecom facilities from a national security perspective.</p><br />

      <p>Hence, the following documents are required to be sent at <a href="mailto:activation@Esim.in">activation@Esim.in</a> in order to activate a mobile connection:</p>
      <ol className="list-decimal list-inside ml-6">
        <li>Copy of your passport (front & back)</li>
        <li>Copy of valid VISA</li>
        <li>Copy of the travel ticket</li>
      </ol>
    </div>
  );
};

export default KYCPolicy;
