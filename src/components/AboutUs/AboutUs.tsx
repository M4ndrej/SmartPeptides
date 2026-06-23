import Image from "next/image";

const AboutUs = () => {
  return (
    <div className="flex items-center sm:flex-col md:flex-col lg:justify-between xl:flex-row ">
      <div className="sm:w-auto md:w-auto lg:w-[496px] xl:w-[592px]">
        <div className="font-16px-ALL">
          <div className="mb-[20px]">
            Smart Peptides is more than a supplier. We are a dependable research
            partner dedicated to supporting scientists, labs, and institutions
            with high standard materials they can trust. Our company was built
            on clear principles: honesty, precision, and consistent performance.
            These values guide every part of what we do and set us apart in a
            crowded industry.
          </div>

          <div className="font-D24px-M18px mb-[20px] text-[#333333]">
            Our Commitment to Quality
          </div>

          <div className="mb-[20px]">
            For us, quality is not a marketing phrase but the foundation of our
            entire operation. Researchers rely on accurate, tested compounds,
            and we take that responsibility seriously. Every peptide goes
            through careful oversight from the moment it is produced to the
            moment it leaves our facility. Strict quality control procedures and
            third-party testing help ensure that each batch meets the demanding
            expectations of professional research environments. When you receive
            a product from Smart Peptides, you&apos;re receiving dependable,
            thoroughly verified materials designed to support reliable and
            reproducible results.
          </div>

          <div className="font-D24px-M18px mb-[20px] text-[#333333]">
            Our Vision
          </div>

          <div className="mb-[20px]">
            Smart Peptides aims to support research that pushes scientific
            boundaries and opens new possibilities for discovery. We believe
            that progress in peptide science should be driven with
            responsibility, awareness, and respect for both people and the
            planet. Our long-term focus is to develop and supply peptides in a
            way that reflects ethical standards and mindful stewardship of
            resources.
          </div>

          <div className="mb-[20px] sm:mb-[40px] md:mb-[40px]">
            We view our mission as a shared path with the scientific community.
            While we continue to improve and innovate, we remain conscious of
            how our work influences the environment and society as a whole.
          </div>

          <div className="mb-[20px] sm:mb-[40px] md:mb-[40px]">
            We invite researchers, scientists, and innovators to walk this path
            with us. By working together, we can move the industry forward not
            only through scientific progress but also through meaningful and
            positive contributions to the world around us.
          </div>
        </div>
      </div>

      <div className="relative h-[355px] w-[355px]  md:h-[491px] md:w-[491px] from834:h-[598px] from834:w-[598px] lg:h-[488px] lg:w-[488px] xl:h-[491px] xl:w-[491px]">
        <Image
          className="select-none object-contain"
          src="/images/aboutUsImg.png"
          alt="Molecules Tube"
          fill={true}
          sizes="(max-width: 766px) 355px, (min-width: 767px) and (max-width: 833px) 491px, (min-width: 834px) and (max-width: 1023px) 598px, (min-width: 1024px) and (max-width: 1199px) 488px, 491px"
        />
      </div>
    </div>
  );
};

export default AboutUs;
