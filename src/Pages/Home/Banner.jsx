import React from 'react';
import { motion } from "motion/react"
import items1 from '../../assets/items/items1.jpg'
import items2 from '../../assets/items/items2.jpg'

const Banner = () => {
    return (
      <div className="hero bg-base-200 min-h-96">
      <div className="hero-content flex-col lg:flex-row-reverse my-12">
       <div className="flex-1">
         <motion.img
          src={items1}
          animate={{y: [0, -20, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{duration: 4, repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          className="max-w-sm rounded-t-[40px] rounded-br-[40px] border-b-8 border-s-8 shadow-2xl border-blue-500"
        />

          <motion.img
          src={items2}
          animate={{x: [0, 20, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{duration: 4, repeat: Infinity,
             repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          className="max-w-sm rounded-t-[40px] rounded-br-[40px] border-b-8 border-s-8 shadow-2xl border-blue-500"
        />
       </div>
        <div className=" flex-1 bg-gradient-to-r from-blue-100 to-blue-200 py-12 px-3 rounded-xl shadow-lg">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-2xl md:text-6xl font-extrabold text-blue-800 mb-12"
          >
            <motion.span
              animate={{
                color: ["#0ea5e9", "#10b981", "#f97316"],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              }}
            >
             Lost?{" "}
            </motion.span>{" "}
           Let's Find It.
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.2 }}
            className="text-2xl md:text-6xl font-extrabold text-blue-800 mb-4"
          >
            
            <motion.span
              animate={{
                color: ["#ef4444", "#f59e0b", "#e11d48"],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              }}
            >
           Found?{" "}
            </motion.span>{" "}
             Return It Here.
          </motion.h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>

    );
};

export default Banner;
