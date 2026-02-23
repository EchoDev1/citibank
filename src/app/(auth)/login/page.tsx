import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";
import { Search, MapPin, Globe, CreditCard, Landmark, Home, DollarSign, TrendingUp, Briefcase } from "lucide-react";
import { CitibankLogoText } from "@/components/layout/citibank-logo";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">

      {/* Top Header - White */}
      <div className="bg-white border-b border-slate-100 py-3">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/">
              <CitibankLogoText className="h-9" />
            </Link>
            <div className="hidden md:flex flex-col border-l border-slate-300 pl-4">
              <span className="text-[12px] font-bold text-[#0d2139] flex items-center gap-1">
                <span className="font-sans font-extrabold tracking-tighter">FDIC</span>
                <span className="font-normal italic text-slate-600">FDIC-Insured – Backed by the full faith and credit of the U.S. Government</span>
              </span>
              <span className="text-[10px] text-slate-500 font-semibold">Citibank, N.A.</span>
            </div>
          </div>

          <div className="flex gap-6 items-center">
            <Link href="#" className="flex flex-col items-center text-slate-500 hover:text-blue-600 transition-colors">
              <MapPin className="h-6 w-6 stroke-1 mb-1" />
              <span className="text-[10px] font-semibold tracking-wider uppercase">ATM / Branch</span>
            </Link>
            <Link href="#" className="flex flex-col items-center text-slate-500 hover:text-blue-600 transition-colors">
              <Globe className="h-6 w-6 stroke-1 mb-1" />
              <span className="text-[10px] font-semibold tracking-wider uppercase">Español</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation - Light Grey */}
      <div className="bg-[#f0f4f7] border-b border-slate-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
          <nav className="flex gap-8 h-full items-center text-[15px] font-semibold text-[#005f9e]">
            <Link href="#" className="hover:underline hidden md:block">Credit Cards</Link>
            <Link href="#" className="hover:underline hidden md:block">Banking</Link>
            <Link href="#" className="hover:underline hidden md:block">Lending</Link>
            <Link href="#" className="hover:underline hidden md:block">Investing</Link>
            <Link href="#" className="hover:underline hidden md:block">Wealth Management</Link>
            <Link href="#" className="hover:underline flex items-center gap-1">
              Open an Account <span className="text-lg leading-none">›</span>
            </Link>
          </nav>
          <button className="text-[#005f9e] hover:text-[#004b80] p-1">
            <Search className="h-5 w-5 stroke-2" />
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-[#FAFAFA] overflow-hidden border-b border-slate-200">
        {/* Decorative background swooshes */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-1/4 w-[150%] h-full bg-gradient-to-br from-white via-slate-50 to-slate-200 transform -skew-x-12 translate-x-32 hidden lg:block opacity-60"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-slate-100 to-transparent"></div>
        </div>

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between py-12 gap-8 lg:gap-4 min-h-[500px]">
          {/* Left Hero Content */}
          <div className="flex-1 max-w-lg mb-8 lg:mb-0 space-y-5">
            <p className="font-semibold tracking-[0.2em] text-[13px] text-slate-500 uppercase">CITI CREDIT CARDS</p>
            <h1 className="text-4xl md:text-[52px] font-bold text-[#333333] leading-tight tracking-tight">
              See If You're Pre-Qualified
            </h1>
            <p className="text-[17px] text-slate-600 leading-relaxed max-w-md">
              Getting started is fast and easy. Checking your eligibility won't impact your credit score.
            </p>
            <div className="pt-2">
              <Link href="#" className="inline-block bg-[#005f9e] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#004b80] transition-colors text-[15px] shadow-sm">
                Learn More
              </Link>
            </div>
          </div>

          {/* Center Cards Image */}
          <div className="hidden md:block flex-shrink-0 relative w-[400px] h-[300px] z-0">
            <img src="/images/HP_12909_MPC_Hero.png" className="object-contain w-full h-full scale-110 drop-shadow-2xl translate-x-12 translate-y-4" alt="Citi Credit Cards" />
          </div>

          {/* Right Login Widget */}
          <div className="w-full max-w-[400px] flex-shrink-0 z-20 xl:translate-x-4">
            <LoginForm />
          </div>
        </div>

        {/* Icon Bar Bottom */}
        <div className="bg-white border-t border-slate-200 py-6 relative z-10 hidden sm:block">
          <div className="max-w-[1280px] mx-auto flex justify-around">
            <button className="h-12 w-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-500 hover:border-blue-500 transition-all shadow-sm bg-white"><CreditCard className="w-5 h-5 stroke-1" /></button>
            <button className="h-12 w-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-500 hover:border-blue-500 transition-all shadow-sm bg-white"><Landmark className="w-5 h-5 stroke-1" /></button>
            <button className="h-12 w-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-500 hover:border-blue-500 transition-all shadow-sm bg-white"><Home className="w-5 h-5 stroke-1" /></button>
            <button className="h-12 w-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-500 hover:border-blue-500 transition-all shadow-sm bg-white"><DollarSign className="w-5 h-5 stroke-1" /></button>
            <button className="h-12 w-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-500 hover:border-blue-500 transition-all shadow-sm bg-white"><TrendingUp className="w-5 h-5 stroke-1" /></button>
            <button className="h-12 w-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-500 hover:border-blue-500 transition-all shadow-sm bg-white"><Briefcase className="w-5 h-5 stroke-1" /></button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white py-12">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

          {/* Tab Navigation (Credit Cards, Checking Accounts, etc) */}
          <div className="border border-slate-200 rounded-lg bg-white overflow-hidden shadow-sm hidden md:flex mb-12">
            <div className="flex w-full justify-between items-center text-[13px] font-bold text-[#005f9e] uppercase tracking-wider">
              <Link href="#" className="flex-1 py-5 text-center hover:bg-slate-50 transition-colors border-r border-slate-200">Credit Cards</Link>
              <Link href="#" className="flex-1 py-5 text-center hover:bg-slate-50 transition-colors border-r border-slate-200">Checking Accounts</Link>
              <Link href="#" className="flex-1 py-5 text-center hover:bg-slate-50 transition-colors border-r border-slate-200">Mortgage</Link>
              <Link href="#" className="flex-1 py-5 text-center hover:bg-slate-50 transition-colors border-r border-slate-200">Personal Loans</Link>
              <Link href="#" className="flex-1 py-5 text-center hover:bg-slate-50 transition-colors border-r border-slate-200">Investing Options</Link>
              <Link href="#" className="flex-1 py-5 text-center hover:bg-slate-50 transition-colors">Small Business</Link>
            </div>
          </div>

          {/* Card Grid */}
          <div className="grid md:grid-cols-3 gap-6">

            {/* Card 1 */}
            <div className="border border-slate-200 rounded-lg overflow-hidden group hover:shadow-xl transition-shadow bg-white flex flex-col">
              <div className="bg-[#e6e6e6] text-center w-full">
                <p className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase pt-4 px-4 text-left">CITI DIAMOND PREFERRED®</p>
                <img src="/images/Zero_APR_3UP.jpg" className="h-[210px] w-full object-cover shadow-sm transition-transform duration-500 hover:opacity-95" alt="Diamond Preferred" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-[22px] font-bold text-[#333] leading-tight mb-3">Save Big on Interest</h3>
                <p className="text-[15px] text-slate-600 mb-6 flex-grow">Enjoy a long-lasting Intro APR, 21 months on Balance Transfers and 12 months on Purchases. Plus, No Annual Fee*</p>
                <Link href="#" className="font-bold text-[#005f9e] hover:underline">Learn More</Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="border border-slate-200 rounded-lg overflow-hidden group hover:shadow-xl transition-shadow bg-white flex flex-col">
              <div className="bg-white text-left w-full h-[210px] flex flex-col pt-4">
                <p className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase px-4 pb-2 shrink-0 h-8 max-h-8">CITI SIMPLICITY CARD®</p>
                <img src="/images/HP_7323_M1M7_3UP.jpg" className="w-full flex-grow object-cover transition-opacity duration-300 hover:opacity-90" alt="Laughing on beach" />
              </div>
              <div className="p-6 flex flex-col flex-grow border-t border-slate-100">
                <h3 className="text-[22px] font-bold text-[#333] leading-tight mb-3">Enjoy Our Lowest Intro Balance Transfer Rate</h3>
                <p className="text-[15px] text-slate-600 mb-6 flex-grow">Get our lowest intro balance transfer rate available with the Citi Simplicity Card along with a low intro rate for purchases.</p>
                <Link href="#" className="font-bold text-[#005f9e] hover:underline">Learn More</Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="border border-slate-200 rounded-lg overflow-hidden group hover:shadow-xl transition-shadow bg-white flex flex-col">
              <div className="bg-white text-left w-full h-[210px] flex flex-col pt-4">
                <p className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase px-4 pb-2 shrink-0 h-8 max-h-8">CITI® CHECKING ACCOUNT</p>
                <div className="flex-grow w-full bg-[#1b5df2] flex flex-col items-center justify-center text-white p-6 relative overflow-hidden group-hover:opacity-95 transition-opacity">
                  <div className="absolute inset-4 border border-white/30 rounded-lg border-dashed pointer-events-none"></div>
                  <p className="text-sm font-semibold mb-1 relative z-10">Earn a</p>
                  <h2 className="text-7xl font-bold tracking-tighter mb-1 relative z-10">$325</h2>
                  <p className="text-xl font-medium relative z-10">Checking Bonus</p>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow border-t border-slate-100">
                <h3 className="text-[22px] font-bold text-[#333] leading-tight mb-3">Earn a $325 Checking Bonus</h3>
                <p className="text-[15px] text-slate-600 mb-6 flex-grow">Earn a bonus when you open a Regular Checking account with Enhanced Direct Deposits & required activities.</p>
                <div className="flex justify-between items-end mt-auto">
                  <Link href="#" className="font-bold text-[#005f9e] hover:underline">Learn More</Link>
                  <button className="bg-slate-500 text-white text-xs px-3 py-1.5 rounded flex items-center gap-1 hover:bg-slate-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                    Feedback
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Wide Promo 1: Choose Right Card */}
          <div className="bg-[#d2eaf4] rounded-xl overflow-hidden shadow-sm flex flex-col md:flex-row min-h-[350px]">
            <div className="w-full md:w-1/2 order-2 md:order-1 flex items-center bg-[#d2eaf4] relative overflow-hidden">
              <img src="/images/HP_16036_AA_Family_3UP.jpg" className="w-full h-full object-cover object-left shadow-2xl transition-transform duration-500 max-h-[350px]" alt="Citi Cards Bundle" />
            </div>
            <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center order-1 md:order-2">
              <p className="font-semibold tracking-[0.2em] text-[12px] text-slate-600 uppercase mb-3">CITI® CREDIT CARDS</p>
              <h2 className="text-4xl font-bold text-[#333] mb-4 leading-tight">Choose the right Citi®<br />credit card for you</h2>
              <p className="text-slate-600 text-[16px] mb-8">Whether you want Cash Back, a Low Intro Rate, Rewards for Costco Members, or Great Airline Miles, the choice is all yours.</p>
              <div>
                <Link href="#" className="inline-block bg-[#005f9e] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#004b80] transition-colors text-[15px] shadow-sm">
                  Learn More
                </Link>
              </div>
            </div>
          </div>

          {/* Wide Promo 2: Double Cash */}
          <div className="bg-[#f7f9fa] rounded-xl overflow-hidden shadow-sm flex flex-col md:flex-row min-h-[350px]">
            <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
              <p className="font-semibold tracking-[0.2em] text-[12px] text-slate-500 uppercase mb-3">CITI DOUBLE CASH® CARD</p>
              <h2 className="text-4xl font-bold text-[#333] mb-4 leading-tight">Earn 2% Cash Back</h2>
              <p className="text-slate-600 text-[16px] mb-8 pr-8">1% when you buy and 1% as you pay on every purchase with no caps or annual fee.</p>
              <div>
                <Link href="#" className="inline-block bg-[#005f9e] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#004b80] transition-colors text-[15px] shadow-sm">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center bg-[#f7f9fa] relative overflow-hidden">
              <img src="/images/HP_7430_H2_Image.png" className="w-full max-w-lg object-contain drop-shadow-2xl scale-125 -translate-x-8" alt="Double Cash Card" />
            </div>
          </div>

          {/* Wide Promo 3: Financial Pathways */}
          <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm flex flex-col md:flex-row min-h-[350px]">
            <div className="w-full md:w-1/2 min-h-[300px] relative">
              <img src="/images/HP_5496_Generational_Wealth.jpg" className="absolute inset-0 w-full h-full object-cover object-top" alt="Smiling Couple" />
            </div>
            <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
              <p className="font-semibold tracking-[0.2em] text-[12px] text-slate-500 uppercase mb-3">CITI FINANCIAL PATHWAYS</p>
              <h2 className="text-4xl font-bold text-[#333] mb-4 leading-tight">Your future, your way</h2>
              <p className="text-slate-600 text-[16px] mb-8 pr-8">Wherever you are on your financial journey, we're here to help with resources to support your goals.</p>
              <div>
                <Link href="#" className="inline-block bg-[#005f9e] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#004b80] transition-colors text-[15px] shadow-sm">
                  Explore Now
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="pt-12 pb-16 text-white font-sans mt-8" style={{ backgroundColor: "#333333" }}>
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Top Links Grid */}
          <div className="flex flex-col md:flex-row justify-between mb-12">

            {/* Column 1 */}
            <div className="flex flex-col gap-4 mb-8 md:mb-0">
              <h4 className="font-bold text-[15px] mb-2 text-white">Why Citi</h4>
              <Link href="#" className="text-[13px] font-medium text-white hover:underline decoration-1 underline-offset-2">Our Story</Link>
              <Link href="#" className="text-[13px] font-medium text-white hover:underline decoration-1 underline-offset-2">Careers</Link>
              <Link href="#" className="text-[13px] font-medium text-white hover:underline decoration-1 underline-offset-2">Benefits and Services</Link>
              <Link href="#" className="text-[13px] font-medium text-white hover:underline decoration-1 underline-offset-2">Rewards</Link>
              <Link href="#" className="text-[13px] font-medium text-white hover:underline decoration-1 underline-offset-2">Citi Entertainment®</Link>
              <Link href="#" className="text-[13px] font-medium text-white hover:underline decoration-1 underline-offset-2">Special Offers</Link>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-4 mb-8 md:mb-0">
              <h4 className="font-bold text-[15px] mb-2 text-white">Wealth Management</h4>
              <Link href="#" className="text-[13px] font-medium text-white hover:underline decoration-1 underline-offset-2">Citigold® Private Client</Link>
              <Link href="#" className="text-[13px] font-medium text-white hover:underline decoration-1 underline-offset-2">Citigold</Link>
              <Link href="#" className="text-[13px] font-medium text-white hover:underline decoration-1 underline-offset-2">Citi Priority</Link>
              <Link href="#" className="text-[13px] font-medium text-white hover:underline decoration-1 underline-offset-2">Citi Private Bank</Link>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-4 mb-8 md:mb-0">
              <h4 className="font-bold text-[15px] mb-2 text-white">Business Banking</h4>
              <Link href="#" className="text-[13px] font-medium text-white hover:underline decoration-1 underline-offset-2">Small Business Accounts</Link>
              <Link href="#" className="text-[13px] font-medium text-white hover:underline decoration-1 underline-offset-2">Commercial Accounts</Link>
            </div>

            {/* Column 4 */}
            <div className="flex flex-col gap-4 mb-8 md:mb-0">
              <h4 className="font-bold text-[15px] mb-2 text-white">Rates</h4>
              <Link href="#" className="text-[13px] font-medium text-white hover:underline decoration-1 underline-offset-2">Personal Banking</Link>
              <Link href="#" className="text-[13px] font-medium text-white hover:underline decoration-1 underline-offset-2">Credit Cards</Link>
              <Link href="#" className="text-[13px] font-medium text-white hover:underline decoration-1 underline-offset-2">Mortgage</Link>
              <Link href="#" className="text-[13px] font-medium text-white hover:underline decoration-1 underline-offset-2">Home Equity</Link>
              <Link href="#" className="text-[13px] font-medium text-white hover:underline decoration-1 underline-offset-2">Personal Loans</Link>
            </div>

            {/* Column 5 */}
            <div className="flex flex-col gap-4 mb-8 md:mb-0">
              <h4 className="font-bold text-[15px] mb-2 text-white">Help & Support</h4>
              <Link href="#" className="text-[13px] font-medium text-white hover:underline decoration-1 underline-offset-2">Contact Us</Link>
              <Link href="#" className="text-[13px] font-medium text-white hover:underline decoration-1 underline-offset-2">Help & FAQs</Link>
              <Link href="#" className="text-[13px] font-medium text-white hover:underline decoration-1 underline-offset-2">Security Center</Link>
            </div>

            {/* Column 6 (Logo) */}
            <div className="flex justify-end min-w-[120px]">
              <div className="flex flex-col items-center opacity-80 mt-1">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  {/* Equal Housing Solid house shape */}
                  <path d="M12 2L2 12h3v10h14V12h3L12 2zm-3.5 16h7v-2h-7v2zm0-4h7v-2h-7v2z" />
                </svg>
                <div className="text-[5.5px] mt-[3px] text-center font-bold tracking-[0.15em] leading-tight uppercase text-white font-sans w-[48px]">
                  EQUAL HOUSING
                  LENDER
                </div>
              </div>
            </div>

          </div>

          {/* App Store & Socials Row */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="flex gap-4">

              {/* Google Play */}
              <div className="border border-[#777] rounded-[5px] px-[10px] py-[6px] flex items-center gap-[6px] hover:bg-white/10 cursor-pointer transition-colors bg-black shadow-none min-w-[140px] h-[42px]">
                <svg width="22" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 3.69385C6 2.65173 7.15286 2.01952 8.03362 2.57688L41.3854 23.6749C42.1627 24.1668 42.1633 25.3051 41.3865 25.7979L8.03477 46.9535C7.15418 47.5122 6 46.8803 6 45.8378V3.69385Z" fill="url(#paint0_linear_play)" />
                  <path d="M6 3.69385C6 2.65173 7.15286 2.01952 8.03362 2.57688L41.3854 23.6749C42.1627 24.1668 42.1633 25.3051 41.3865 25.7979" stroke="#E1E1E1" strokeWidth="0.5" />
                  <defs>
                    <linearGradient id="paint0_linear_play" x1="6" y1="24.5" x2="41.5" y2="24.5" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#3FCC71" />
                      <stop offset="0.33" stopColor="#30A1EB" />
                      <stop offset="0.66" stopColor="#EA4335" />
                      <stop offset="1" stopColor="#FBBC04" />
                    </linearGradient>
                  </defs>
                  {/* Quick manual drawing of play colors */}
                  <path d="M6,4 V46 L27,25 Z" fill="#30A1EB" />
                  <path d="M6,4 L27,25 L34,18 L19,8 Z" fill="#3FCC71" />
                  <path d="M34,18 L27,25 L34,32 L42,26 Z" fill="#FBBC04" />
                  <path d="M6,46 L19,42 L34,32 L27,25 Z" fill="#EA4335" />
                </svg>
                <div className="flex flex-col leading-none text-left justify-center mt-[-2px]">
                  <span className="text-[9px] text-white/90 uppercase tracking-[0.02em] font-medium" style={{ fontFamily: "Arial, sans-serif" }}>GET IT ON</span>
                  <span className="text-[15px] font-semibold text-white tracking-tight mt-[1px]" style={{ fontFamily: "Arial, sans-serif" }}>Google Play</span>
                </div>
              </div>

              {/* App Store */}
              <div className="border border-[#777] rounded-[5px] px-[10px] py-[6px] flex items-center gap-[8px] hover:bg-white/10 cursor-pointer transition-colors bg-black shadow-none min-w-[140px] h-[42px]">
                <svg width="22" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                  <path d="M12.94 4.54a3.89 3.89 0 0 0 .97-2.8 4 4 0 0 0-2.61 1.34 3.73 3.73 0 0 0-1 2.76 3.2 3.2 0 0 0 2.64-1.3zM15.42 16.5c-1.2 1.76-2.43 3.51-4.4 3.53-2 .02-2.58-1.18-4.83-1.18-2.26 0-2.92 1.16-4.8 1.2-2 .05-3.4-1.92-4.63-3.69-2.5-3.64-4.4-10.27-1.85-14.7A6.47 6.47 0 0 1 10.32 0c1.9 0 3.66 1.32 4.86 1.32 1.18 0 3.23-1.5 5.43-1.28A6.34 6.34 0 0 1 24 3.68c-4.45 2.15-3.7 8.35.6 10.05-1 2.4-2.2 4.67-4 6.78a23.16 23.16 0 0 1-5.18 3.99z" />
                </svg>
                <div className="flex flex-col leading-none text-left justify-center mt-[-2px]">
                  <span className="text-[9px] text-white/90 tracking-normal font-medium" style={{ fontFamily: "Arial, sans-serif" }}>Download on the</span>
                  <span className="text-[16px] font-semibold text-white tracking-tight mt-[1px]" style={{ fontFamily: "Arial, sans-serif" }}>App Store</span>
                </div>
              </div>

            </div>

            <div className="flex gap-7 mt-6 md:mt-0 items-center justify-end text-white pr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="hover:text-gray-300 cursor-pointer transition-colors"><path d="M14 2h-3a5 5 0 0 0-5 5v3H3v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="hover:text-gray-300 cursor-pointer transition-colors"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="hover:text-gray-300 cursor-pointer transition-colors"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.4l5.88 3.3-5.88 3.32z" /></svg>
            </div>
          </div>

          <div className="border-t border-[#666666] mb-5"></div>

          {/* Copyright & Legal Links */}
          <div className="flex flex-wrap gap-x-5 gap-y-3 mb-10 items-center">
            <span className="font-bold text-white text-[13px]">© 2026 Citigroup Inc</span>
            <Link href="#" className="font-medium text-white text-[13px] hover:underline decoration-1 underline-offset-2">Terms & Conditions</Link>
            <Link href="#" className="font-medium text-white text-[13px] hover:underline decoration-1 underline-offset-2">Privacy</Link>
            <Link href="#" className="font-medium text-white text-[13px] hover:underline decoration-1 underline-offset-2">Notice at Collection</Link>
            <Link href="#" className="font-medium text-white text-[13px] hover:underline decoration-1 underline-offset-2">Do Not Sell or Share My Personal Information</Link>
            <Link href="#" className="font-medium text-white text-[13px] hover:underline decoration-1 underline-offset-2">Accessibility</Link>
          </div>

          {/* Legal Text block */}
          <div className="text-[12px] text-white/70 space-y-[14px] leading-relaxed max-w-[1400px]">
            <p>Citibank.com provides information about and access to accounts and financial services provided by Citibank, N.A. and its affiliates in the United States and its territories. This is not, and should not be construed as, an offer, invitation, or solicitation to buy or sell any of the banking or financial products mentioned herein to individuals outside of the United States. The products and services mentioned herein are not offered to individual residents in Europe, including the European Union, European Economic Area, Switzerland, the United Kingdom, and similar countries.</p>
            <p>Terms, conditions and fees for accounts, products, programs and services are subject to change. Not all accounts, products, and services as well as pricing described here are available in all jurisdictions or to all customers. Your eligibility for a particular product and service is subject to a final determination by Citibank and its affiliates. Your country of citizenship, domicile, or residence if other than the United States, may have laws rules, and regulations that govern or affect your application for and use of our accounts, products and services, including laws regarding taxes, exchange and/or capital controls that you are responsible for following.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
