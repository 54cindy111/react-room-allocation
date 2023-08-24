import React from 'react';
import { useState, useEffect } from 'react';
import '@/app.scss';
import { RoomAllocation } from '@/components/roomAllocation';
import { Col, Row } from 'antd';

function App() {
	const [guest, setGuest] = useState(10);
	const [room, setRoom] = useState(3);
	const [result, onChange] = useState([]);

	const [sumRoomGuest, setSumRoomGuest] = useState(guest - room);

	useEffect(() => {
		const roomGuestList = result.map((x: any) => x.adult + x.child);
		const _sumRoomGuest = roomGuestList.reduce((x, y) => x + y, 0);
		setSumRoomGuest(_sumRoomGuest);
		console.log(result);
	}, [result]);
	return (
		<Row justify='center'>
			<Col>
				<Row justify='center' className='pageName'>
					Room-Allocation
				</Row>
				<RoomAllocation
					guest={guest}
					room={room}
					onChange={onChange}
					setGuest={setGuest}
					setRoom={setRoom}
					result={result}
					sumRoomGuest={sumRoomGuest}
				/>
			</Col>
		</Row>
	);
}
export default App;
