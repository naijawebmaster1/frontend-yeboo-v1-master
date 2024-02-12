import React from 'react';
import Nav from '../../components/base-components/nav/nav';
import Footer from '../../components/base-components/footer/footer';

const AntiSlavery = () => {
    return (
        <>
            <Nav />
            <div className="min-h-screen py-8">
                <div className="container mx-auto px-4 bg-white rounded-sm shadow-lg p-4">
                    <h1 className=" text-lg text-center md:text-3xl font-bold mb-4">ANTI-SLAVERY AND ANTI-TRAFFICKING</h1>

                    <div className=" mb-8">
                        <p className="text-lg mb-4">
                            Yeboo Entertainment Limited, operating the website{' '}
                            <a href="https://www.useYeboo.com" className="text-blue-500 hover:underline">
                                www.useYeboo.com
                            </a>{' '}
                            ("Yeboo" or the "Company"), is a dynamic platform dedicated to enhancing user experience in the realm of entertainment and lifestyle. We are committed to upholding the highest standards of security, consent, and privacy, ensuring a safe and enjoyable environment for all users.
                        </p>
                    </div>

                    <div className=" mb-8">
                        <p className="text-lg mb-4">
                            Yeboo Entertainment Limited is staunchly opposed to all forms of modern slavery and human trafficking. We are dedicated to building one of the safest digital platforms in the industry and vehemently oppose any form of modern slavery or human trafficking in our operations, collaborations, or supply chain.                        </p>
                    </div>

                    <div className=" mb-8">
                        <p className="text-lg mb-4">
                            This statement, aligning with our Company's values and objectives, is made in accordance with the UK Modern Slavery Act, Australia Modern Slavery Act, and the California Transparency in Supply Chains Act. It outlines the steps Yeboo Entertainment Limited has taken to ensure that modern slavery and human trafficking are not present in our business operations, partnerships, or supply chains.    </p>
                    </div>

                    <div className=" mb-8">
                        <h2 className="text-2xl font-bold mb-4">Our Commitment</h2>
                        <p className="text-lg mb-4">
                            Yeboo Entertainment Limited stands firmly against all manifestations of modern slavery and human trafficking, recognizing these as grave violations of fundamental human rights. These violations can take various forms, such as forced labor, servitude, and human trafficking, all characterized by the exploitation of individuals for personal or commercial gain.
                        </p>

                        <p className="text-lg mb-4">
                        Our commitment is to conduct business with integrity, focusing on mitigating the risks of modern slavery and human trafficking in our dealings and relationships. This includes ensuring fair and respectful treatment of all employees, partners, and vendors, maintaining safe working conditions, and conducting environmentally responsible and ethical operations.                        </p>

                    </div>

                    <div className=" mb-8">
                        <h2 className="text-2xl font-bold mb-4">Steps Taken to Prevent, Detect, and Report Modern Slavery and Human Trafficking Risks</h2>
                        <ul className="list-disc pl-6 text-lg mb-4">
                            <li>Implemented mandatory modern slavery and trafficking training across the company.</li>
                            <li>Developed and disseminated company-wide policies on acceptable business practices and ethical conduct.</li>
                            <li>Conducted thorough reviews of our supply chain to identify and mitigate risks related to modern slavery and human trafficking.</li>
                            <li>Enhanced our content moderation processes, including the addition of specialist resources.</li>
                            <li>Appointed an independent monitor to review and continually improve our safety controls and compliance program.</li>
                            <li>Increased collaborations with third parties dedicated to combating modern slavery and human trafficking.</li>
                        </ul>
                    </div>

                    <div className=" mb-8">
                        <h2 className="text-2xl font-bold mb-4">Our Policies</h2>
                        <p className="text-lg mb-4">
                            Yeboo Entertainment Limited is dedicated to ensuring no modern slavery or human trafficking activities occur on our platform, within our business, or in our supply chain.
                        </p>
                        <ul className="list-disc pl-6 text-lg mb-4">
                            <li>A Code of Conduct & Business Ethics outlining our expectation for all employees to act with integrity, comply with all applicable laws, and specifically address modern slavery and human trafficking.</li>
                            <li>This Anti-Slavery and Anti-Trafficking Statement, outlining our overarching commitment and specific actions to mitigate these risks.</li>
                            <li>Terms of Service and Acceptable Use Policies that expressly forbid any content promoting or related to human trafficking or exploitation.</li>
                        </ul>

                        <p className="text-lg mb-4">
                        We hold our employees and suppliers to high standards. Any violation by an employee can result in disciplinary action, including termination. Any violation by a supplier can lead to contract termination.                        </p>

                    </div>

                    <div className=" mb-8">
                        <h2 className="text-2xl font-bold mb-4">Our Risk Assessment</h2>
                        <p className="text-lg mb-4">
                            Yeboo Entertainment Limited continuously assesses risks related to modern slavery and human trafficking in our business environment. This assessment considers external reports, standards, and risk profiles based on country and sector. We adjust our processes and controls accordingly to address changing risks.
                        </p>
                        <ul className="list-disc pl-6 text-lg mb-4">
                            <li>Our risk mitigation efforts include careful screening of creators, enhancing content moderation, contractual obligations for compliance by contractors and agency staff, and consideration of manufacturing risks in procured merchandise.</li>
                        </ul>

                        <p className="text-lg mb-4">
                        We invite users and community members to report any concerns to our dedicated channels, <b>contact@useyeboo.com and privacy@useyeboo.com</b>. Our ongoing commitment is to improve our practices continually and transparently.
                        </p>
                    </div>

                    <div className=" mb-8">
                        <h2 className="text-2xl font-bold mb-4">Responsibility for this Statement</h2>
                        <p className="text-lg mb-4">
                        Our Executive Leadership bears overall responsibility for compliance with this statement and related policies. Our Legal team oversees these principles, addresses queries, and ensures effective internal controls to counter modern slavery and human trafficking.                        </p>
                        <p className="text-lg mb-4">
                            This statement has been approved by the Board of Yeboo Entertainment Limited.
                        </p>
                        <p className="text-lg my-10">
                            Remilekun Adekoya<br />
                            <b> Director of Yeboo Entertainment Limited</b>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    );
};

export default AntiSlavery;
