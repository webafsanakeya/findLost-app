import React from "react";

const Faq = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      
      <div className="space-y-4">
        {/* Q1 */}
        <div className="collapse collapse-arrow bg-base-100 border border-base-300 rounded-lg shadow-md transition-all">
          <input type="radio" name="faq" defaultChecked />
          <div className="collapse-title font-semibold text-lg">
            How do I report a lost item?
          </div>
          <div className="collapse-content text-sm text-gray-600">
            To report a lost item, go to the “Report Item” page, fill in the details such as item name, description, location where it was lost, and upload an image if available. Once submitted, it will be reviewed and published on the lost items list.
          </div>
        </div>

        {/* Q2 */}
        <div className="collapse collapse-arrow bg-base-100 border border-base-300 rounded-lg shadow-md transition-all">
          <input type="radio" name="faq" />
          <div className="collapse-title font-semibold text-lg">
            How do I claim a found item listed on the website?
          </div>
          <div className="collapse-content text-sm text-gray-600">
            If you see your lost item listed under “Found Items,” click “Claim” and submit a short verification form. The person who found it will review your claim and contact you through the system if it matches.
          </div>
        </div>

        {/* Q3 */}
        <div className="collapse collapse-arrow bg-base-100 border border-base-300 rounded-lg shadow-md transition-all">
          <input type="radio" name="faq" />
          <div className="collapse-title font-semibold text-lg">
            Can I edit or delete a post after submission?
          </div>
          <div className="collapse-content text-sm text-gray-600">
            Yes. Go to “Manage My Items” (after logging in) where you can click view details for update or delete a post if the item is recovered or listed by mistake.
          </div>
        </div>

        {/* Q4 */}
        <div className="collapse collapse-arrow bg-base-100 border border-base-300 rounded-lg shadow-md transition-all">
          <input type="radio" name="faq" />
          <div className="collapse-title font-semibold text-lg">
            Do I need to create an account to use the website?
          </div>
          <div className="collapse-content text-sm text-gray-600">
            Yes. Creating an account is required to submit, claim, or recover items. This helps us verify authenticity and maintain a safe environment.
          </div>
        </div>

        {/* Q5 */}
        <div className="collapse collapse-arrow bg-base-100 border border-base-300 rounded-lg shadow-md transition-all">
          <input type="radio" name="faq" />
          <div className="collapse-title font-semibold text-lg">
            Is this service free to use?
          </div>
          <div className="collapse-content text-sm text-gray-600">
            Yes! The Find & Lost platform is completely free for all users. Our goal is to help people reunite with their lost belongings safely and quickly.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
