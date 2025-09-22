import React from 'react'

const Footer = () => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-200 py-12 px-6 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 ">

        {/* Solutions */}
        <div>
          <h3 className="text-lg font-semibold text-indigo-400 mb-4">Solutions</h3>
          <nav className="flex flex-col space-y-2">
            <a href="https://www.thinkific.com/solutions/subject-matter-experts/" className="hover:text-indigo-300 transition">Experts</a>
            <a href="https://www.thinkific.com/solutions/academies/" className="hover:text-indigo-300 transition">Academies</a>
            <a href="https://www.thinkific.com/solutions/market-leaders-companies/" className="hover:text-indigo-300 transition">Companies</a>
            <a href="https://www.thinkific.com/solutions/revenue-generation/" className="hover:text-indigo-300 transition">Revenue generation</a>
            <a href="https://www.thinkific.com/solutions/customer-training/" className="hover:text-indigo-300 transition">Customer training</a>
            <a href="https://www.thinkific.com/solutions/lead-generation/" className="hover:text-indigo-300 transition">Lead generation</a>
          </nav>
        </div>

        {/* Platform */}
        <div>
          <h3 className="text-lg font-semibold text-indigo-400 mb-4">Platform</h3>
          <nav className="flex flex-col space-y-2">
            <a href="/pricing/" className="hover:text-indigo-300 transition">Pricing</a>
            <a href="/features/courses/" className="hover:text-indigo-300 transition">Courses</a>
            <a href="/features/learning-communities/" className="hover:text-indigo-300 transition">Communities</a>
            <a href="/features/digital-downloads/" className="hover:text-indigo-300 transition">Digital Downloads</a>
            <a href="/features/memberships/" className="hover:text-indigo-300 transition">Memberships</a>
            <a href="/features/coaching-webinars/" className="hover:text-indigo-300 transition">Coaching and Webinars</a>
            <a href="/features/landing-pages/" className="hover:text-indigo-300 transition">Landing Pages</a>
           
          </nav>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold text-indigo-400 mb-4">Company</h3>
          <nav className="flex flex-col space-y-2">
            <a href="https://www.thinkific.com/about/" className="hover:text-indigo-300 transition">About us</a>
            <a href="https://investors.thinkific.com/" target="_blank" className="hover:text-indigo-300 transition">Investors</a>
            <a href="https://www.thinkific.com/press/" className="hover:text-indigo-300 transition">Press</a>
            <a href="https://www.thinkific.com/careers/" className="hover:text-indigo-300 transition">Careers</a>
            <a href="https://www.thinkific.com/security-overview/" className="hover:text-indigo-300 transition">Security</a>
            <a href="https://www.thinkific.com/legal/" className="hover:text-indigo-300 transition">Legal</a>
            <a href="https://www.thinkific.com/terms-of-service/" className="hover:text-indigo-300 transition">Terms of Service</a>
          </nav>
        </div>

        {/* Customers */}
        <div>
          <h3 className="text-lg font-semibold text-indigo-400 mb-4">Customers</h3>
          <nav className="flex flex-col space-y-2">
            <a href="https://www.thinkific.com/examples/" className="hover:text-indigo-300 transition">Customer inspiration</a>
            <a href="https://www.thinkific.com/case-studies/" className="hover:text-indigo-300 transition">Case Studies</a>
          </nav>
        </div>

        {/* Partners */}
        <div>
          <h3 className="text-lg font-semibold text-indigo-400 mb-4">Partners</h3>
          <nav className="flex flex-col space-y-2">
            <a href="https://www.thinkific.com/partners/" className="hover:text-indigo-300 transition">Become a partner</a>
            <a href="https://www.thinkific.com/experts/" className="hover:text-indigo-300 transition">Experts marketplace</a>
            <a href="https://www.thinkific.com/affiliates/" className="hover:text-indigo-300 transition">Affiliate program</a>
            <a href="https://www.thinkific.com/plus/referacustomer/" className="hover:text-indigo-300 transition">Refer a customer</a>
          </nav>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-indigo-400 mb-4">Resources</h3>
          <nav className="flex flex-col space-y-2">
            <a href="/resources/" className="hover:text-indigo-300 transition">Resource center</a>
            <a href="/blog/" className="hover:text-indigo-300 transition">Blog</a>
            <a href="https://webinars.thinkific.com/" target="_blank" className="hover:text-indigo-300 transition">Webinars</a>
            <a href="https://support.thinkific.com/hc/en-us" target="_blank" className="hover:text-indigo-300 transition">Help center</a>
            <a href="http://status.thinkific.com" target="_blank" className="hover:text-indigo-300 transition">Status</a>
            <a href="https://www.thinkific.com/faq/" className="hover:text-indigo-300 transition">FAQ</a>
            <a href="https://www.thinkific.com/the-thought-process-newsletter/" className="hover:text-indigo-300 transition">Newsletter</a>
          </nav>
        </div>

      </div>
      <div className="mt-10 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Thinkific. All rights reserved.
      </div>
    </div>
  )
}

export default Footer
