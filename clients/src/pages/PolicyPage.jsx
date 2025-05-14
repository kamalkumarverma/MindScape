import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800 leading-relaxed">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy & Terms of Service</h1>

      <ol className="space-y-4 list-decimal list-inside text-base">
        <li>
          <strong>Free Credits on First Login:</strong> Each user will receive <strong>5 free credits</strong> upon their first successful login.
        </li>

        <li>
          <strong>Login Required:</strong> Users must be logged in to generate images. Guest access or anonymous generation is not allowed.
        </li>

        <li>
          <strong>Payment Issues:</strong> If a user’s money is deducted but credits are not added, please reach out via our <a href="/contact" className="text-blue-500 underline">contact form</a>. We will resolve the issue at the earliest.
        </li>

        <li>
          <strong>Ownership & Rights:</strong> All rights are reserved by the developer. Unauthorized duplication or use of content is prohibited.
        </li>

        <li>
          <strong>Final Authority:</strong> The final decision regarding any dispute, refund, or service limitation rests solely with the platform provider.
        </li>

        <li>
          <strong>User Suggestions:</strong> Users are encouraged to suggest features or improvements to enhance our service experience. Use the contact form for submissions.
        </li>

        <li>
          <strong>Stay Connected:</strong> Users can stay updated and connect with us through our social media handles:
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>LinkedIn</li>
            <li>GitHub</li>
            <li>LeetCode</li>
          </ul>
        </li>
      </ol>

      <div className="mt-10 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} kamalkumar.com — All rights reserved.
      </div>
    </div>
  );
};

export default PrivacyPolicy;
