import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
const apiKey = import.meta.env.API_KEY;
const channelId = import.meta.env.CHANNELID;

function YoutubeChannelVideos({ videoId, thumbnail }) {
	const [videos, setVideos] = useState([]);

	useEffect(() => {
		const fetchChannelVideos = async () => {
			const response = await fetch(
				`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&maxResults=1&type=video`
			);
			const data = await response.json();
			setVideos(data.items);
		};
		fetchChannelVideos();
	}, []);

	const opts = {
		height: "80",
		width: "280",
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 0,
		},
	};

	if (videos?.length > 0) {
		return (
			<div className="youtube-holder">
				{/* <h2>Your Channel Videos</h2> */}
				{videos?.map((video) => (
					<div key={video.id.videoId}>
						<YouTube videoId={video.id.videoId} opts={opts} />
					</div>
				))}
			</div>
		);
	} else {
		return (
			<div className="youtube-holder">
				{/* <h2>Sample YouTube Video</h2> */}
				<YouTube videoId="dQw4w9WgXcQ" opts={opts} />
			</div>
		);
	}
}

export default YoutubeChannelVideos;
