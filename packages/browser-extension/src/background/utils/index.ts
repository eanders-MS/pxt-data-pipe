export function addStreamStopListener(stream: MediaStream, callback: Function) {
	var streamEndedEvent = 'ended';
	if ('oninactive' in stream) {
		streamEndedEvent = 'inactive';
	}

	stream.addEventListener(streamEndedEvent, () => {
		callback();
		callback = () => { };
	}, false);

	stream.getAudioTracks().forEach((track) => {
		track.addEventListener(streamEndedEvent, () => {
			callback();
			callback = () => { };
		}, false);
	});

	stream.getVideoTracks().forEach((track) => {
		track.addEventListener(streamEndedEvent, () => {
			callback();
			callback = () => { };
		}, false);
	});
}

export function getAspectRatio(w: number, h: number) {
	function gcd(a: number, b: number) {
		return (b == 0) ? a : gcd(b, a % b);
	}
	var r = gcd(w, h);
	return (w / r) / (h / r);
}

export function randomId() {
	return Math.random().toString(36).slice(2);
}
