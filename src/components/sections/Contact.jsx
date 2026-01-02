import React from "react";
import { useForm } from "react-hook-form";
import { Canvas } from "@react-three/fiber";
import { Mail, MapPin, Send, AlertCircle, ArrowRight } from "lucide-react";
import ContactGlobe from "../3d/ContactGlobe";
import useIsMobile from "../../hooks/useIsMobile"; // <--- ADDED MISSING IMPORT

const Contact = () => {
  const isMobile = useIsMobile();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  const onSubmit = async (data) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <section
      id="contact"
      className="min-h-screen bg-[#050505] flex items-center justify-center relative overflow-hidden"
    >
      {/* 3D BACKGROUND - OPTIMIZED: ONLY RENDERS ON DESKTOP */}
      {!isMobile && (
        <div className="absolute inset-0 z-0 opacity-100 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 4.5] }} dpr={[1, 1.5]}>
            <ContactGlobe />
          </Canvas>
        </div>
      )}

      {/* REMOVED THE SECOND DUPLICATE CANVAS BLOCK THAT WAS HERE */}

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 items-center relative z-10">
        <div className="order-1">
          <div className="font-mono text-cyan-500 text-xs mb-4">
            /// ESTABLISH_CONNECTION
          </div>
          <h2 className="text-6xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-[0.9]">
            READY TO
            <br />
            COLLABORATE?
          </h2>
          <p className="text-gray-400 leading-relaxed mb-8 max-w-sm">
            I am currently available for select freelance opportunities. If you
            have a project that requires high-end engineering, signal me.
          </p>
          <div className="flex flex-col gap-4 font-mono text-sm">
            <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors cursor-pointer">
              <Mail size={16} /> hello@kavyabuilds.com
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <MapPin size={16} /> Hyderabad, IN
            </div>
          </div>
        </div>

        <div className="flex justify-center lg:justify-start pl-12 w-full">
          <div className="w-full max-w-md bg-gradient-to-br from-cyan-900/10 to-blue-900/10 backdrop-blur-2xl border border-cyan-500/20 p-8 rounded-2xl relative group shadow-[0_0_50px_rgba(0,240,255,0.1)] overflow-hidden">
            <div className="absolute inset-0 border border-cyan-500/10 rounded-2xl pointer-events-none" />

            {isSubmitSuccessful ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-cyan-400">
                  <Send size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white">MESSAGE SENT</h3>
              </div>
            ) : (
              <form
                className="space-y-6 relative z-20"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="space-y-2 group/input">
                  <label className="text-xs font-mono text-gray-500">
                    NAME
                  </label>
                  <input
                    {...register("name", { required: true })}
                    className="w-full bg-black/50 border-b border-cyan-500/20 py-3 text-white focus:border-cyan-500 focus:bg-black/70 focus:outline-none transition-all placeholder-white/20 px-2"
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <span className="text-[10px] text-red-400 flex items-center gap-1">
                      <AlertCircle size={10} /> REQUIRED
                    </span>
                  )}
                </div>
                <div className="space-y-2 group/input">
                  <label className="text-xs font-mono text-gray-500">
                    EMAIL
                  </label>
                  <input
                    {...register("email", {
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    })}
                    className="w-full bg-black/50 border-b border-cyan-500/20 py-3 text-white focus:border-cyan-500 focus:bg-black/70 focus:outline-none transition-all placeholder-white/20 px-2"
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <span className="text-[10px] text-red-400 flex items-center gap-1">
                      <AlertCircle size={10} /> INVALID
                    </span>
                  )}
                </div>
                <div className="space-y-2 group/input">
                  <label className="text-xs font-mono text-gray-500">
                    PROJECT DETAILS
                  </label>
                  <textarea
                    {...register("message", { required: true })}
                    rows="4"
                    className="w-full bg-black/50 border-b border-cyan-500/20 py-3 text-white focus:border-cyan-500 focus:bg-black/70 focus:outline-none transition-all resize-none placeholder-white/20 px-2"
                    placeholder="Project details..."
                  />
                  {errors.message && (
                    <span className="text-[10px] text-red-400 flex items-center gap-1">
                      <AlertCircle size={10} /> EMPTY
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-cyan-500 text-black font-bold font-mono tracking-widest rounded-sm hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    "ENCRYPTING..."
                  ) : (
                    <>
                      CONTACT ME <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
