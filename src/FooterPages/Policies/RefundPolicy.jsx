import React, { useEffect } from 'react';

const RefundPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const styles = {
    container: {
      maxWidth: '1000px',
      margin: '40px auto',
      padding: '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#f9f9f9',
      borderRadius: '12px',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.30)'
    },
    heading1: {
      fontSize: '2rem',
      color: '#102e47',
      marginBottom: '20px',
    },
    heading2: {
      fontSize: '1.2rem',
      color: '#102e47',
      marginTop: '20px',
    },
    paragraph: {
      lineHeight: '1.6',
      color: '#333',
    },
    link: {
      color: '#007bff',
      textDecoration: 'none',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading1}>Return/Refund Policy</h1>
      <p style={styles.paragraph}>
        We offer refunds on the purchase of our SIM/eSIM plans. However, since we deal with digital goods, we honour requests for refund for the following reasons within <strong>5 days</strong> of purchase of our products:
      </p>

      <h2 style={styles.heading2}>Non-delivery of the product:</h2>
      <p style={styles.paragraph}>
        Due to an issue with the mail or courier in case of physical SIM cards, you do not receive delivery of SIM or eSIM from us subject to a complaint having been launched at{' '}
        <a href="mailto:support@esim.in" style={styles.link}>support@esim.in</a> for the missing product;
      </p>

      <h2 style={styles.heading2}>Irreparable defects with the eSIM or SIM:</h2>
      <p style={styles.paragraph}>
        Although all the products are thoroughly tested before release, unexpected errors may occur. This reason should be stated to our Support Team for its approval of your refund request;
      </p>

      <h2 style={styles.heading2}>Product not-as-described:</h2>
      <p style={styles.paragraph}>
        A request based on this reason is addressed on a case-by-case basis and subject to our approval. To prevent this kind of claim from arising, every customer is encouraged to check all the related information described in the product detail before buying.
      </p>

      <h2 style={styles.heading2}>Important:</h2>
      <p style={styles.paragraph}>
        A customer is supposed to have checked the compatibility of handsets before ordering an ESIM from our website, a request for refund is not entertained in case the handset used/to be used by the customer is not compatible with the ESIM. The details of handsets compatibility may be checked from our website.
      </p>
    </div>
  );
};

export default RefundPolicy;
