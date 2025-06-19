import React from "react";
import Title from "./Title";
import { MdPayment } from "react-icons/md";
import { TbTruckReturn } from "react-icons/tb";
import { FaHeadset } from "react-icons/fa";
import about from "../assets/book_1.png";

const About = () => {
  return (
    <section className="max-padd-container py-12 xl:py-24">
      {/* container */}
      <div className="flexCenter flex-col gap-16 xl:gap-8 xl:flex-row">
        {/* left side */}
        <div className="flex-1">
          <Title
            title1={"Unveiling Our "}
            title2={"Store's key features!"}
            title1Styles={"pb-0"}
            paraStyles={"!block"}
          />
          <div className="flex flex-col items-start gap-y-4">
            <div className="flexCenter gap-x-4">
              <div className="h-16 min-w-16 bg-secondaryOne flexCenter rounded-md">
                <TbTruckReturn className="text-2xl " />
              </div>
              <div>
                <h4 className="medium-18">Easy Return Process</h4>
                <p>We offer a hassle-free return process to ensure your shopping experience remains smooth and convenient.</p>
              </div>
            </div>
             <div className="flexCenter gap-x-4">
              <div className="h-16 min-w-16 bg-secondaryOne flexCenter rounded-md">
                <MdPayment className="text-2xl " />
              </div>
              <div>
                <h4 className="medium-18">Secure Payment Options</h4>
                <p>Your payments are safe with us. We support secure and trusted payment gateways for a worry-free checkout.</p>
              </div>
            </div>
             <div className="flexCenter gap-x-4">
              <div className="h-16 min-w-16 bg-secondaryOne flexCenter rounded-md">
                <FaHeadset className="text-2xl " />
              </div>
              <div>
                <h4 className="medium-18">Live Customer Support</h4>
                <p>Get real-time assistance from our support team to help you with any questions or concerns you may have.</p>
              </div>
            </div>
          </div>
        </div>
        {/* right side */}
        <div className="flex-1 flexCenter">
          <div className="flexCenter bg-secondaryOne p-24 max-h-[33rem] max-w-[33rem] rounded-3xl">
            <img src={about} alt="aboutImg" height={244} width={244} className="shadow-2xl shadow-slate-900/50 rounded-lg"/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
