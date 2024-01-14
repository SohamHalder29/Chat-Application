import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { ADD_AUDIO_MESSAGE_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import {
  FaMicrophone,
  FaPauseCircle,
  FaPlay,
  FaStop,
  FaTrash,
} from "react-icons/fa";
import { MdSend } from "react-icons/md";
import WaveSurfer from "wavesurfer.js";

const CaptureAudio = ({ hide }) => {
  const [{ userInfo, currentChatUser, socket }, dispatch] = useStateProvider();

  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [waveForm, setWaveForm] = useState(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [renderAudio, setRenderAudio] = useState(null);

  const AudioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const waveFormRef = useRef(null);

  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";

    const minutes = Math.floor(time / 60);
    const secondes = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${secondes
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration((prevDuration) => {
          setTotalDuration(prevDuration + 1);
          return prevDuration + 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRecording]);

  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      container: waveFormRef.current,
      waveColor: "#ccc",
      progressColor: "#4a9eff",
      cursorColor: "#7ae3c3",
      barWidth: 2,
      height: 30,
      responsive: true,
    });
    setWaveForm(waveSurfer);

    waveSurfer.on("finish", () => {
      setIsPlaying(false);
    });
    return () => {
      waveSurfer.destroy();
    };
  }, []);

  useEffect(() => {
    if (waveForm) handleStartRecording();
  }, [waveForm]);

  useEffect(() => {
    if (recordedAudio) {
      const upadatePlaybackTime = () => {
        setCurrentPlaybackTime(recordedAudio.currentTime);
      };
      recordedAudio.addEventListener("timeupdate", upadatePlaybackTime);

      return () => {
        recordedAudio.removeEventListener("timeupdate", upadatePlaybackTime);
      };
    }
  }, [recordedAudio]);

  const handleStartRecording = () => {
    setRecordingDuration(0);
    setCurrentPlaybackTime(0);
    setTotalDuration(0);
    setIsRecording(true);
    setRecordedAudio(null)
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        AudioRef.current.srcObject = stream;
        console.log(mediaRecorderRef);
        const chunk = [];
        mediaRecorder.ondataavailable = (e) => {
          chunk.push(e.data);
          console.log(`${e.data} bla bla`);
        };
        mediaRecorder.onstop = () => {
          const blob = new Blob(chunk, { type: "audio/ogg; codecs=opus" });
          const audioURL = URL.createObjectURL(blob);
          const audio = new Audio(audioURL);
          setRecordedAudio(audio);
          waveForm.load(audioURL);
        };
        mediaRecorder.start();
      })
      .catch((error) => {
        console.log("Error accessing MicroPhone", error);
      });
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      waveForm.stop();
      const audioChunks = [];
      mediaRecorderRef.current.addEventListener("dataavailable", (event) => {
        audioChunks.push(event.data);
      });

      mediaRecorderRef.current.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
        const audioFile = new File([audioBlob], "recording.mp3");
        setRenderAudio(audioFile);
      });
    }
  };
  const handlePlayRecording = () => {
    if (recordedAudio) {
      waveForm.stop();
      waveForm.play();
      recordedAudio.play();
      setIsPlaying(true);
    }
  };

  const handlePauseRecording = () => {
    waveForm.stop();
    waveForm.pause();
    setIsPlaying(false);
  };

  const sendRecording = async () => {
    try {
      const formData = new FormData();
      formData.append("audio", renderAudio);
      const response = await axios.post(ADD_AUDIO_MESSAGE_ROUTE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          from: userInfo.id,
          to: currentChatUser.id,
        },
      });
      if (response.status === 201) {
        socket.current.emit("send-msg", {
          to: currentChatUser?.id,
          from: userInfo?.id,
          message: response.data.message,
        });
        dispatch({
          type: reducerCases.ADD_MESSAGE,
          newMessage: { ...response.data.message },
          fromSelf: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={"flex text-2xl w-full justify-end items-center"}>
      <div className={"shadow-lg"}>
        <FaTrash className={"text-panel-header-icon"} onClick={() => hide()} />
      </div>
      <div
        className={
          "mx-4 py-2 px-4 text-lg text-white flex gap-3 justify-center items-center bg-search-input-container-background rounded-full drop-shadow-lg"
        }>
        {isRecording ? (
          <div className={"text-red-500 animate-pulse w-60 text-center"}>
            <span> Recording {recordingDuration}s</span>
          </div>
        ) : (
          <div>
            {recordedAudio && (
              <>
                {!isPlaying ? (
                  <FaPlay onClick={handlePlayRecording} />
                ) : (
                  <FaStop onClick={handlePauseRecording} />
                )}
              </>
            )}
          </div>
        )}
        <div className={"w-60"} ref={waveFormRef} hidden={isRecording}>
          {recordedAudio && isPlaying && (
            <span> {formatTime(currentPlaybackTime)}</span>
          )}
          {recordedAudio && !isPlaying && (
            <span>{formatTime(totalDuration)}</span>
          )}
          <audio ref={AudioRef} hidden />
        </div>
      </div>
      <div className={"mr-4"}>
        {!isRecording ? (
          <FaMicrophone
            className={"text-red-500"}
            onClick={handleStartRecording}
          />
        ) : (
          <FaPauseCircle
            className={"text-red-500"}
            onClick={handleStopRecording}
          />
        )}
      </div>
      <div>
        <MdSend
          className={"text-panel-header-icon cursor-pointer mr-4"}
          title={"send"}
          onClick={sendRecording}
        />
      </div>
    </div>
  );
};

export default CaptureAudio;
