import React from "react";
import TwoWayAudio from "../../assets/twowayaudio.png";
import NightVisionExplained from "../../assets/nightvisionexplained.png";
import MotionDetector from "../../assets/motiondetector.png";
import FullHD from "../../assets/fullhd.png";
import Suitable from "../../assets/suitable.png";
import CardStorage from "../../assets/cardstorage.png";

import classes from "./SecondDetails.module.css";
import Video from "../../assets/gif/video_gif.gif";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";

const SecondDetails = (props) => {
  const AutoplaySlider = withAutoplay(AwesomeSlider);
  return (
    <div className={classes.SecondDetails}>
      <AutoplaySlider
        play={true}
        cancelOnInteraction={false} // should stop playing on user interaction
        interval={6000}
        organicArrows={false}
      >
        <div
          style={{
            marginTop: "40px",
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "#fff",
          }}
        >
          <div className={classes.Left}>
            <div className={classes.ItemTextHeader}>TWO-WAY AUDIO</div>
            <div className={classes.ItemTextDetails}>
              <p>
                You can install our App(ios and Android compatible) which allows
                you to obtain real-time video from any location whether you are
                in Greece, Australia or taking a cool nap on a caribbean beach.
                The WiFi Camera is equiped with a built-in microphone and
                speaker so that you can at anytime communicate with family, you
                pets, or employees.
              </p>
              <p>
                It is also compatible with most routers, supporting a 2.4G
                bandwidth. Nework cable options are also available.
              </p>
            </div>
          </div>
          <div className={classes.Video}>
            <img
              src={TwoWayAudio}
              style={{ width: "500px", height: "413px" }}
            />
          </div>
        </div>

        <div
          style={{
            marginTop: "40px",
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "#fff",
          }}
        >
          <div className={classes.Left}>
            <div className={classes.ItemTextHeader}>NIGHT VISION</div>
            <div className={classes.ItemTextDetails}>
              <p>
                When night falls, the camera automatically switch to night
                vision mode in low light conditions, with a wider rage of night
                vision and better definition.
              </p>
            </div>
          </div>
          <div className={classes.Video}>
            <img
              src={NightVisionExplained}
              style={{ width: "500px", height: "413px" }}
            />
          </div>
        </div>

        <div
          style={{
            marginTop: "40px",
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "#fff",
          }}
        >
          <div className={classes.Left}>
            <div className={classes.ItemTextHeader}>MOTION DETECTOR ALARM</div>
            <div className={classes.ItemTextDetails}>
              <p>
                The camera will take real-time pictures of any abnormal
                movements and will send out alarm notices immediately.
              </p>
            </div>
          </div>
          <div className={classes.Video}>
            <img
              src={MotionDetector}
              style={{ width: "500px", height: "413px" }}
            />
          </div>
        </div>
        <div
          style={{
            marginTop: "40px",
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "#fff",
          }}
        >
          <div className={classes.Left}>
            <div className={classes.ItemTextHeader}>1080P FULL HD</div>
            <div className={classes.ItemTextDetails}>
              <p>
                The security camera delivers hight resolution video. Combined
                with 90 degree wide angle lens, the surveillance camera presents
                you a crystal clear view of what's going on.
              </p>
            </div>
          </div>
          <div className={classes.Video}>
            <img src={FullHD} style={{ width: "500px", height: "413px" }} />
          </div>
        </div>
        <div
          style={{
            marginTop: "40px",
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "#fff",
          }}
        >
          <div className={classes.Left}>
            <div className={classes.ItemTextHeader}>SUITABILITY</div>
            <div className={classes.ItemTextDetails}>
              <p>
                The all metal casing can be used indoors and outdoors and is
                entirely protected from rain, dust or snow.
              </p>
            </div>
          </div>
          <div className={classes.Video}>
            <img src={Suitable} style={{ width: "500px" }} />
          </div>
        </div>
        <div
          style={{
            marginTop: "40px",
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "#fff",
          }}
        >
          <div className={classes.Left}>
            <div className={classes.ItemTextHeader}>CARD STORAGE</div>
            <div className={classes.ItemTextDetails}>
              <p>
                Supports TF Card Storage, External TF Storage,Maximum Support
                128G TF card
              </p>
            </div>
          </div>
          <div className={classes.Video}>
            <img src={CardStorage} style={{ width: "500px" }} />
          </div>
        </div>
      </AutoplaySlider>
    </div>
  );
};

export default SecondDetails;
