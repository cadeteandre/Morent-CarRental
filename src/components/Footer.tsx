const Footer = () => {
  return (
    <footer className="footer bg-white p-10 font-display  ">
      <section className="w-full grid grid-rows-2 grid-cols-2 gap-y-8 gap-x-2  md:grid-rows-1  md:gap-x-7 md:grid-cols-[3fr_1fr_1fr_1fr]">
        <div className="section1 flex  flex-col gap-2.5 ">
          <h1 className="text-primary font-bold text-2xl  ">MORENT</h1>
          <p className="text-neutral-600  text-sm/7 ">
            Our vision is to provide convenience and help increase your sales
            business.
          </p>
        </div>
        <div className="section2 flex  flex-col gap-2.5 ">
          <h6 className="text-neutral-700 font-bold text-lg">About</h6>
          <div className="flex flex-col gap-2">
            <a className="link link-hover text-neutral-700  text-sm  ">
              How it works
            </a>
            <a className="link link-hover text-neutral-700  text-sm  ">
              Featured
            </a>
            <a className="link link-hover text-neutral-700  text-sm  ">
              Partnership
            </a>
            <a className="link link-hover text-neutral-700  text-sm  whitespace-nowrap ">
              Business Relation
            </a>
          </div>
        </div>

        <div className="section3 flex flex-col gap-2.5 ">
          <h6 className="text-neutral-700 font-bold text-lg">Community</h6>
          <div className="flex flex-col gap-2">
            <a className="link link-hover text-neutral-700  text-sm  ">
              Events
            </a>
            <a className="link link-hover text-neutral-700  text-sm  ">Blog</a>
            <a className="link link-hover text-neutral-700  text-sm  ">
              Podcast
            </a>
            <a className="link link-hover text-neutral-700  text-sm  ">
              Invite a friend
            </a>
          </div>
        </div>
        <div className="section4 flex flex-col gap-2.5">
          <h6 className="text-neutral-700 font-bold text-lg">Socials</h6>
          <div className="flex flex-col gap-2">
            <a className="link link-hover text-neutral-700  text-sm  ">
              Discord
            </a>
            <a className="link link-hover text-neutral-700  text-sm  ">
              Instagram
            </a>
            <a className="link link-hover text-neutral-700  text-sm  ">
              Twitter
            </a>
            <a className="link link-hover text-neutral-700  text-sm  ">
              Facebook
            </a>
          </div>
        </div>
      </section>

      <div className="w-full border-t border-gray-300  "></div>

      <div className="  flex flex-col  justify-between items-start w-full gap-0 md:flex-row">
        <p className="text-neutral-500  text-sm  ">
          ©2025 MORENT. All rights reserved
        </p>
        <div className="flex gap-5 ">
          <a className="link link-hover text-neutral-700  text-sm  ">
            Privacy & Policy
          </a>
          <a className="link link-hover text-neutral-700  text-sm  ">
            Terms & Condition
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
