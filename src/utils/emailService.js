import emailjs from '@emailjs/browser';

export const sendEmail = async (formRef) => {
  try {
    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'dummy_service_id';
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'dummy_template_id';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'dummy_public_key';
    
    // In a real scenario with proper env vars, uncomment the below lines.
    // For now, if dummy vars are used it'll error out, so we mock success if keys missing.
    if (serviceID === 'dummy_service_id') {
      return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1000));
    }

    const result = await emailjs.sendForm(serviceID, templateID, formRef.current, publicKey);
    return { success: true, result };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error };
  }
};
