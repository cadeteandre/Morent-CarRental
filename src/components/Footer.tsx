const Footer = () => {
  return (
    <>
      <footer className="footer bg-white text-base-content p-10">
        <div className="flex lg:flex-row lg:justify-between gap-5">
          <div className="flex flex-[2] flex-col space-y-4">
            <h1 className="text-[#3563E9] font-bold text-[24px] leading-[27.6px] font-sans">
              MORENT
            </h1>
            <p className="text-[#666666] font-normal text-[14px] leading-[22.4px] font-sans">
              Our vision is to provide
              <br />
              convenience and help
              <br />
              increase your sales
              <br />
              business.
            </p>
          </div>
          <div className="flex flex-[1] flex-col space-y-4">
            <h6 className="text-[#333333] font-bold text-[18px] leading-[27.6px] font-sans capitalize footer-title">
              About
            </h6>
            <div className="flex flex-col space-y-1">
              <a className="link link-hover text-[#333333] font-normal text-[14px] leading-[22.4px] font-sans">
                How it works
              </a>
              <a className="link link-hover text-[#333333] font-normal text-[14px] leading-[22.4px] font-sans">
                Featured
              </a>
              <a className="link link-hover text-[#333333] font-normal text-[14px] leading-[22.4px] font-sans">
                Partnership
              </a>
              <a className="link link-hover text-[#333333] font-normal text-[14px] leading-[22.4px] whitespace-nowrap font-sans">
                Business Relation
              </a>
            </div>
          </div>
        </div>

        <div className="flex lg:flex-row lg:justify-between gap-17 mt-2">
          <div className="flex flex-1 flex-col space-y-4">
            <h6 className="text-[#333333] font-bold text-[18px] leading-[20.7px] font-sans capitalize footer-title">
              Community
            </h6>
            <div className="flex flex-col space-y-1">
              <a className="link link-hover text-[#333333] font-normal text-[14px] leading-[22.4px] font-sans">
                Events
              </a>
              <a className="link link-hover text-[#333333] font-normal text-[14px] leading-[22.4px] font-sans">
                Blog
              </a>
              <a className="link link-hover text-[#333333] font-normal text-[14px] leading-[22.4px] font-sans">
                Podcast
              </a>
              <a className="link link-hover text-[#333333] font-normal text-[14px] leading-[22.4px] font-sans">
                Invite a friend
              </a>
            </div>
          </div>
          <div className="flex flex-1 flex-col space-y-4">
            <h6 className="text-[#333333] font-bold text-[18px] leading-[20.7px] font-sans capitalize footer-title">
              Socials
            </h6>
            <div className="flex flex-col space-y-1">
              <a className="link link-hover text-[#333333] font-normal text-[14px] leading-[22.4px] font-sans">
                Discord
              </a>
              <a className="link link-hover text-[#333333] font-normal text-[14px] leading-[22.4px] font-sans">
                Instagram
              </a>
              <a className="link link-hover text-[#333333] font-normal text-[14px] leading-[22.4px] font-sans">
                Twitter
              </a>
              <a className="link link-hover text-[#333333] font-normal text-[14px] leading-[22.4px] font-sans">
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="w-full border-t border-gray-300 my-1 sm:my-2"></div>
        <div className="mt-1 sm:mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center w-full">
          <p className="text-[#666666] font-normal text-[14px] leading-[8.1px] font-sans">
            ©2025 MORENT. All rights reserved
          </p>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <a className="link link-hover text-[#333333] font-normal text-[14px] leading-[16.1px] font-sans">
              Privacy & Policy
            </a>
            <a className="link link-hover text-[#333333] font-normal text-[14px] leading-[16.1px] font-sans">
              Terms & Condition
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
