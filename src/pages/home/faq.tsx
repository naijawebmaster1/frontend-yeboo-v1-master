import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'
import Nav from '../../components/base-components/nav/nav'
import Footer from '../../components/base-components/footer/footer';

const faqs = [
  {
    question: "What is Yeboo?",
    answer: "Yeboo is Africa's premier adult entertainment platform, offering a range of services like meaningful hookups, dinner dates, erotic massages, holiday companions, and travel partners."
  },
  {
    question: "How do I sign up for Yeboo?",
    answer: "Signing up is quick and easy. Just create a free account via our mobile or web app, and you'll be ready to connect with others."
  },
  {
    question: "Is Yeboo safe to use?",
    answer: "Yes, we prioritize your privacy, security, and consent at all times, ensuring a safe, secure, and consensual environment for all users."
  },
  {
    question: "Are profiles on Yeboo verified?",
    answer: "Yes, we have Elite Premier Verified Profiles to ensure a safe and genuine experience for our users."
  },
  {
    question: "What kind of experiences can I find on Yeboo?",
    answer: "Yeboo offers a wide range of experiences including intimate dates, erotic massages, companions for travel or holidays, and even adult entertainment for parties."
  },
  {
    question: "How does Yeboo ensure user privacy?",
    answer: "Yeboo uses advanced security measures to protect your personal information and interactions on the platform."
  },
  {
    question: "Can I find a travel companion on Yeboo?",
    answer: "Absolutely, Yeboo offers the service of connecting you with travel companions suited to your preferences."
  },
  {
    question: "Is there an age restriction to join Yeboo?",
    answer: "Yes, only individuals above 18 years are allowed to create an account on Yeboo, and KYC verification is required."
  },
  {
    question: "How do I complete my KYC process on Yeboo?",
    answer: "Complete your KYC by confirming your age (above 18) and uploading the required documents for review."
  },
  {
    question: "Can I use Yeboo for finding a holiday buddy?",
    answer: "Yes, Yeboo offers the service of connecting you with companions for holidays."
  },
  {
    question: "Is Yeboo available internationally?",
    answer: "Currently, Yeboo primarily serves the African market, focusing on providing local, tailored experiences."
  },
  {
    question: "How do I find someone with specific interests on Yeboo?",
    answer: "Use our search and filter options to connect with individuals who share your interests and desires."
  },
  {
    question: "What makes Yeboo different from other dating platforms?",
    answer: "Yeboo offers a unique blend of services with a focus on adult entertainment, emphasizing privacy, security, and consent."
  },
  {
    question: "Can I use Yeboo for free?",
    answer: "Yes, creating an account on Yeboo is free. Some services may require payment."
  },
  {
    question: "How can I ensure my safety while meeting someone from Yeboo?",
    answer: "Always communicate your boundaries clearly and meet in public places for the first time."
  },
  {
    question: "What should I do if I encounter a problem on Yeboo?",
    answer: "Contact our customer support immediately for any issues or concerns."
  },
  {
    question: "Can I find long-term relationships on Yeboo?",
    answer: "While Yeboo focuses on adult entertainment, users are free to seek any type of connection, including long-term relationships."
  },
  {
    question: "Are there educational resources available on Yeboo?",
    answer: "Yes, we offer educational resources to enhance your experience and understanding of our services."
  },
  {
    question: "How does Yeboo handle user consent?",
    answer: "Yeboo has strict policies to ensure that all interactions are consensual, with respect and consent being core values of our community."
  },
  {
    question: "Can I delete my Yeboo account?",
    answer: "Yes, you can delete your account at any time through the settings in your profile."
  },
  {
    question: "How can I update my profile on Yeboo?",
    answer: "You can update your profile through the account settings on our web or mobile app, personalizing it to reflect your interests and preferences."
  },
  {
    question: "What types of payment does Yeboo accept?",
    answer: "Yeboo accepts various forms of payment, which can vary depending on your location. Please check our payment options in the app or website."
  },
  {
    question: "Can I remain anonymous on Yeboo?",
    answer: "Yes, Yeboo respects user privacy. You can choose how much personal information you wish to disclose in your profile."
  },
  {
    question: "How do I report inappropriate behavior on Yeboo?",
    answer: "If you encounter any inappropriate behavior, report it immediately using the report function on our app or website."
  },
  {
    question: "Are there any community guidelines for Yeboo users?",
    answer: "Yes, Yeboo has a set of community guidelines that all users must follow, emphasizing respect, consent, and safety."
  },
  {
    question: "Does Yeboo have a mobile app?",
    answer: "Yes, Yeboo has a mobile app available for both Android and iOS devices, in addition to our web platform."
  },
  {
    question: "Can I block or mute someone on Yeboo?",
    answer: "Yes, you have the option to block or mute other users if you do not wish to interact with them."
  },
  {
    question: "Are there any special features for VIP members on Yeboo?",
    answer: "Yes, VIP members have access to exclusive features, including advanced search options and premium content."
  },
  {
    question: "How do I become a VIP member on Yeboo?",
    answer: "You can sign up for VIP membership through our app or website, where you'll find the various plans and benefits listed."
  },
  {
    question: "Is Yeboo suitable for finding casual relationships?",
    answer: "Yes, Yeboo caters to a variety of preferences, including those looking for casual relationships."
  },
  {
    question: "How does Yeboo handle data privacy?",
    answer: "Yeboo adheres to strict data privacy laws, ensuring that your personal information is securely stored and protected."
  },
  {
    question: "Can I get customer support in my local language on Yeboo?",
    answer: "Yeboo offers customer support in multiple languages. Please check our support page for available language options."
  },
  {
    question: "Are there any success stories from Yeboo users?",
    answer: "Yes, many users have shared their success stories, which you can find in our testimonials section."
  },
  {
    question: "How often does Yeboo update its platform?",
    answer: "We regularly update our platform to enhance user experience and add new features."
  },
  {
    question: "Can I host or attend events organized through Yeboo?",
    answer: "Yes, Yeboo occasionally hosts events and allows users to connect for event planning and attendance."
  }
];


export default function FAQ() {
  return (
    <>
       <Nav/>
    <div className="bg-white">

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq, i) => (
              <Disclosure as="div" key={`${faq.question} - ${i}`} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-base font-semibold leading-7">{faq.question}</span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                          ) : (
                            <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div> 

    <Footer/>
    </>

  )
}