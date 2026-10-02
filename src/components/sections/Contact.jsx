import React from "react";
import { useForm } from "react-hook-form";
import { Canvas } from "@react-three/fiber";
import {
  Instagram,
  MapPin,
  Send,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";
import ContactGlobe from "../3d/ContactGlobe";
import useIsMobile from "../../hooks/useIsMobile";

const Contact = () => {
  const isMobile = useIsMobile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  // Add your WhatsApp number here.
  // Example: 919876543210
  // No +, spaces, or dashes.
  const WHATSAPP_NUMBER = "918919326014";

  const onSubmit = async (data) => {
    const whatsappMessage = `
Hi Kavya,

Name: ${data.name}
Email: ${data.email}

Message:
${data.message}
    `.trim();

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      whatsappMessage,
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    reset();
  };

  return (
    <section
      id="contact"
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#050505]
        text-white
      "
    >
      {/* =====================================================
          3D GLOBE
      ====================================================== */}

      {!isMobile && (
        <div className="pointer-events-none absolute inset-0 z-0 opacity-80">
          <Canvas camera={{ position: [0, 0, 4.5] }} dpr={[1, 1.5]}>
            <ContactGlobe />
          </Canvas>
        </div>
      )}

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 z-[1]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_5%,#050505_78%)]" />

        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-[500px]
            w-[500px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-cyan-400/[0.025]
            blur-[160px]
          "
        />
      </div>

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-screen
          w-full
          max-w-[1280px]
          flex-col
          px-6
          md:px-10
        "
      >
        {/* ===================================================
            SECTION HEADING
        ==================================================== */}

        <div className="w-full pt-12 md:pt-16">
          <span
            className="
              font-mono
              text-[12px]
              uppercase
              tracking-[0.35em]
              text-cyan-400/70
            "
          >
            CONTACT
          </span>
        </div>

        {/* ===================================================
            HORIZONTAL CONTENT
        ==================================================== */}

        <div
          className="
            grid
            flex-1
            w-full
            grid-cols-1
            items-center
            gap-16
            py-20
            lg:grid-cols-2
            lg:gap-20
          "
        >
          {/* =================================================
              LEFT CONTENT
          ================================================== */}

          <div className="flex flex-col items-start text-left">
            {/* Descriptor */}

            <div className="mb-8">
              <span
                className="
                  font-mono
                  text-[9px]
                  uppercase
                  tracking-[0.3em]
                  text-white/25
                "
              >
                /// ESTABLISH_CONNECTION
              </span>
            </div>

            {/* Main heading */}

            <h2
              className="
                max-w-[700px]
                text-7xl
                font-medium
                leading-[0.88]
                tracking-[-0.055em]
                sm:text-7xl
                md:text-8xl
                lg:text-9xl
              "
            >
              <span className="text-white">Let's</span>

              <br />

              <span className="text-white/35">build.</span>
            </h2>

            {/* Description */}

            <p
              className="
                mt-10
                max-w-md
                text-sm
                font-light
                leading-7
                tracking-[0.015em]
                text-white/35
                md:text-base
              "
            >
              I am currently available for select freelance opportunities. If
              you have something worth building, send me a signal.
            </p>

            {/* Social / Location */}

            <div className="mt-10 flex flex-col items-start gap-5">
              <a
                href="https://instagram.com/kavyabuilds"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  flex
                  w-fit
                  items-center
                  gap-3
                  font-mono
                  text-[9px]
                  tracking-[0.25em]
                  text-white/30
                  transition-colors
                  duration-300
                  hover:text-cyan-400
                "
              >
                <Instagram
                  size={14}
                  strokeWidth={1.2}
                  className="
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  "
                />
                @KAVYABUILDS
              </a>

              <div
                className="
                  flex
                  items-center
                  gap-3
                  font-mono
                  text-[9px]
                  tracking-[0.25em]
                  text-white/20
                "
              >
                <MapPin size={14} strokeWidth={1.2} />
                HYDERABAD, IN
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT — FORM
          ================================================== */}

          <div className="flex w-full justify-center lg:justify-end">
            <div className="w-full max-w-[520px]">
              {isSubmitSuccessful ? (
                <div
                  className="
                    flex
                    min-h-[430px]
                    flex-col
                    items-center
                    justify-center
                    border
                    border-white/[0.08]
                    bg-white/[0.015]
                    px-8
                    text-center
                  "
                >
                  <div
                    className="
                      mb-6
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-cyan-400/30
                      text-cyan-400
                    "
                  >
                    <Send size={18} strokeWidth={1.2} />
                  </div>

                  <h3
                    className="
                      text-2xl
                      font-medium
                      tracking-[-0.04em]
                      text-white
                    "
                  >
                    MESSAGE READY
                  </h3>

                  <p
                    className="
                      mt-4
                      max-w-xs
                      text-sm
                      leading-6
                      text-white/30
                    "
                  >
                    WhatsApp has been opened with your message ready to send.
                  </p>

                  <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="
                      mt-8
                      font-mono
                      text-[8px]
                      uppercase
                      tracking-[0.3em]
                      text-white/30
                      transition-colors
                      hover:text-cyan-400
                    "
                  >
                    SEND ANOTHER
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="
                    relative
                    border
                    border-white/[0.08]
                    bg-white/[0.012]
                    p-7
                    text-left
                    md:p-9
                  "
                >
                  {/* Top accent */}

                  <div
                    className="
                      absolute
                      left-0
                      right-0
                      top-0
                      h-px
                      bg-gradient-to-r
                      from-transparent
                      via-cyan-400/40
                      to-transparent
                    "
                  />

                  {/* NAME */}

                  <div className="group mb-9">
                    <label
                      htmlFor="name"
                      className="
                        mb-3
                        block
                        font-mono
                        text-[10px]
                        uppercase
                        tracking-[0.3em]
                        text-white/50
                        transition-colors
                        duration-300
                        group-focus-within:text-cyan-400/70
                      "
                    >
                      01 / NAME
                    </label>

                    <input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      {...register("name", {
                        required: true,
                      })}
                      className="
                        w-full
                        border-b
                        border-white/10
                        bg-transparent
                        px-0
                        py-3
                        text-sm
                        font-light
                        text-white
                        outline-none
                        placeholder:text-white/15
                        transition-colors
                        duration-300
                        focus:border-cyan-400/60
                      "
                    />

                    {errors.name && (
                      <span
                        className="
                          mt-2
                          flex
                          items-center
                          gap-1
                          font-mono
                          text-[7px]
                          tracking-[0.2em]
                          text-cyan-400/60
                        "
                      >
                        <AlertCircle size={9} />
                        REQUIRED
                      </span>
                    )}
                  </div>

                  {/* EMAIL */}

                  <div className="group mb-9">
                    <label
                      htmlFor="email"
                      className="
                        mb-3
                        block
                        font-mono
                        text-[10px]
                        uppercase
                        tracking-[0.3em]
                        text-white/50
                        transition-colors
                        duration-300
                        group-focus-within:text-cyan-400/70
                      "
                    >
                      02 / EMAIL
                    </label>

                    <input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      {...register("email", {
                        required: true,
                        pattern: /^\S+@\S+$/i,
                      })}
                      className="
                        w-full
                        border-b
                        border-white/10
                        bg-transparent
                        px-0
                        py-3
                        text-sm
                        font-light
                        text-white
                        outline-none
                        placeholder:text-white/15
                        transition-colors
                        duration-300
                        focus:border-cyan-400/60
                      "
                    />

                    {errors.email && (
                      <span
                        className="
                          mt-2
                          flex
                          items-center
                          gap-1
                          font-mono
                          text-[7px]
                          tracking-[0.2em]
                          text-cyan-400/60
                        "
                      >
                        <AlertCircle size={9} />
                        INVALID EMAIL
                      </span>
                    )}
                  </div>

                  {/* MESSAGE */}

                  <div className="group mb-10">
                    <label
                      htmlFor="message"
                      className="
                        mb-3
                        block
                        font-mono
                        text-[10px]
                        uppercase
                        tracking-[0.3em]
                        text-white/50
                        transition-colors
                        duration-300
                        group-focus-within:text-cyan-400/70
                      "
                    >
                      03 / MESSAGE
                    </label>

                    <textarea
                      id="message"
                      rows={4}
                      placeholder="Tell me about your project..."
                      {...register("message", {
                        required: true,
                      })}
                      className="
                        w-full
                        resize-none
                        border-b
                        border-white/10
                        bg-transparent
                        px-0
                        py-3
                        text-sm
                        font-light
                        leading-6
                        text-white
                        outline-none
                        placeholder:text-white/15
                        transition-colors
                        duration-300
                        focus:border-cyan-400/60
                      "
                    />

                    {errors.message && (
                      <span
                        className="
                          mt-2
                          flex
                          items-center
                          gap-1
                          font-mono
                          text-[7px]
                          tracking-[0.2em]
                          text-cyan-400/60
                        "
                      >
                        <AlertCircle size={9} />
                        MESSAGE REQUIRED
                      </span>
                    )}
                  </div>

                  {/* SUBMIT */}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="
                      group
                      flex
                      items-center
                      gap-4
                      border-b
                      border-cyan-400/30
                      pb-4
                      font-mono
                      text-[10px]
                      uppercase
                      tracking-[0.3em]
                      text-white/75
                      transition-all
                      duration-300
                      hover:border-cyan-400
                      hover:text-cyan-400
                      disabled:cursor-not-allowed
                      disabled:opacity-40
                    "
                  >
                    {isSubmitting ? (
                      "OPENING WHATSAPP..."
                    ) : (
                      <>
                        SEND TO WHATSAPP
                        <ArrowUpRight
                          size={14}
                          strokeWidth={1.2}
                          className="
                            transition-transform
                            duration-300
                            group-hover:translate-x-1
                            group-hover:-translate-y-1
                          "
                        />
                      </>
                    )}
                  </button>

                  <p
                    className="
                      mt-5
                      font-mono
                      text-[7px]
                      tracking-[0.22em]
                      text-white/15
                    "
                  >
                    YOUR MESSAGE WILL OPEN DIRECTLY IN WHATSAPP
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ===================================================
            BOTTOM MARKER
        ==================================================== */}

        <div className="flex w-full items-center justify-between pb-8">
          <span className="font-mono text-[7px] tracking-[0.3em] text-white/15">
            KAVYA BUILDS
          </span>

          <span className="font-mono text-[7px] tracking-[0.3em] text-white/15">
            06 / 06
          </span>
        </div>
      </div>
    </section>
  );
};

export default Contact;
