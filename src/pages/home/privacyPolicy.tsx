import React from 'react'
import Nav from '../../components/base-components/nav/nav'
import Footer from '../../components/base-components/footer/footer'

function PrivacyPolicy() {
  return (
    <div>
      <Nav />
      <div className="bg-gray-100 min-h-screen py-10">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-semibold mb-4">Privacy Policy</h1>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Introduction</h2>
            <p>
              Yeboo Entertainment Limited respects the privacy of its users and is committed to protecting it through our compliance with this policy. This policy describes the types of information we may collect from you or that you may provide when you visit the website www.useyeboo.com (our "Website") and our practices for collecting, using, maintaining, protecting, and disclosing that information.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">Information We Collect About You and How We Collect It</h2>
            <p>
              We collect several types of information from and about users of our Website, including information by which you may be personally identified, such as name, postal address, email address, telephone number, or any other identifier by which you may be contacted online or offline ("personal information").
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">How We Use Your Information</h2>
            <p>
              We use information that we collect about you or that you provide to us, including any personal information to present our Website and its contents to you, to provide you with information, products, or services that you request from us, to fulfill any other purpose for which you provide it.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">Disclosure of Your Information</h2>
            <p>
              We may disclose personal information that we collect, or you provide as described in this privacy policy to our subsidiaries and affiliates, to contractors, service providers, and other third parties we use to support our business.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">Data Security</h2>
            <p>
              We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">Changes to Our Privacy Policy</h2>
            <p>
              It is our policy to post any changes we make to our privacy policy on this page. If we make material changes to how we treat our users' personal information, we will notify you through a notice on the Website home page.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">Contact Information</h2>
            <p>
              To ask questions or comment about this privacy policy and our privacy practices, contact us at: <a href="mailto:contactus@useyeboo.com">contactus@useyeboo.com</a>.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default PrivacyPolicy
