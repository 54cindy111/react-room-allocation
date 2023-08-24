import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Col, Row, Divider } from 'antd';
import '@/app.scss';

export function CustomInputNumber(props: any) {
	const { min, max, step, isMinBtnDisabled, isMaxBtnDisabled } = props;
	const { value, setValue } = props;
	const [isFocus, setIsFocus] = useState(false);
	const interval: any = useRef();
	let u = 0;
	function planting(x: any) {
		interval.current = setInterval(() => {
			u = u + 1;
			x === 'min' ? handleChange(value - u * step) : handleChange(value + u * step);
		}, 300);
	}
	function notPlanting() {
		clearInterval(interval.current);
	}

	const handleChange = (val: any) => {
		val > max ? setValue(Number(max)) : val < min ? setValue(Number(min)) : setValue(Number(val));
		setIsFocus(false);
	};
	const handleBlur = () => {
		setIsFocus(false);
	};
	useEffect(() => {
		value === '' && setValue(0);
	}, [value]);

	return (
		<div className='customInputNumberBox'>
			<button
				className={
					isMinBtnDisabled || min === value ? 'btnBoxStyle btnDisabledStyle' : 'btnBoxStyle'
				}
				disabled={isMinBtnDisabled}
				onClick={() => handleChange(value - step)}
				onMouseDown={() => planting('min')}
				onMouseUp={() => notPlanting()}
			>
				-
			</button>
			<input
				className='btnBoxStyle'
				type='number'
				min={min}
				max={max}
				step={step}
				value={value}
				onFocus={() => setIsFocus(true)}
				onChange={(event) => handleChange(event.target.value)}
				onBlur={handleBlur}
				disabled={isMinBtnDisabled || (min === value && isMaxBtnDisabled) || max === value}
			></input>
			<button
				className={
					isMaxBtnDisabled || max === value ? 'btnBoxStyle btnDisabledStyle' : 'btnBoxStyle'
				}
				disabled={isMaxBtnDisabled}
				onClick={() => handleChange(value + step)}
				onMouseDown={() => planting('max')}
				onMouseUp={() => notPlanting()}
			>
				+
			</button>
		</div>
	);
}

export function RoomBlock(props: any) {
	const {
		roomAdultGuestMin = 1,
		roomGuestMax,
		step = 1,
		onRoomChange,
		isMinBtnDisabled,
		isMaxBtnDisabled,
	} = props;
	//
	const [adultMin, setAdultMin] = useState(roomAdultGuestMin);
	const [adultMax, setAdultMax] = useState(roomGuestMax);
	const [adultValue, setAdultValue] = useState(roomAdultGuestMin);
	const [childMin, setChildMin] = useState(0);
	const [childMax, setChildMax] = useState(roomGuestMax - roomAdultGuestMin);
	const [childValue, setChildValue] = useState(0);

	useEffect(() => {
		setAdultMax(roomGuestMax - childValue);
		setChildMax(roomGuestMax - adultValue);
		onRoomChange({ adult: Number(adultValue), child: Number(childValue) });
	}, [adultValue, childValue]);
	return (
		<Col className='roomBlock'>
			<Col className='title'>房間:{adultValue + childValue}人</Col>
			<Row style={{ padding: '10px 0' }}>
				<Col span={12}>
					<Col className='text1'>大人</Col>
					<Col className='text2'>年齡20+</Col>
				</Col>
				<Col span={12}>
					<CustomInputNumber
						min={adultMin}
						max={adultMax}
						step={step}
						value={adultValue}
						setValue={setAdultValue}
						isMinBtnDisabled={isMinBtnDisabled}
						isMaxBtnDisabled={isMaxBtnDisabled}
					/>
				</Col>
			</Row>
			<Row>
				<Col span={12}>
					<Col>小孩</Col>
				</Col>
				<Col span={12}>
					<CustomInputNumber
						min={childMin}
						max={childMax}
						step={step}
						value={childValue}
						setValue={setChildValue}
						isMinBtnDisabled={isMinBtnDisabled}
						isMaxBtnDisabled={isMaxBtnDisabled}
					/>
				</Col>
			</Row>
		</Col>
	);
}
export function RoomAllocation(props: any) {
	const { guest, room, sumRoomGuest, roomGuestMax = 4, setGuest, setRoom } = props;
	const { result, onChange } = props;

	const [isMinBtnDisabled, setMinBtnDisabled] = useState(false);
	const [isMaxBtnDisabled, setMaxBtnDisabled] = useState(false);

	const handleResult = (i: number, roomResult: any) => {
		result.splice(i, 1, roomResult);
		onChange(() => [...result]);
	};

	useEffect(() => {
		if (guest > room * roomGuestMax) {
			setGuest(room * roomGuestMax);
		} else if (room > guest) {
			setRoom(guest);
		}
	}, [guest]);

	useEffect(() => {
		setMaxBtnDisabled(guest - sumRoomGuest ? false : true);
		if (room === guest) {
			setMinBtnDisabled(true);
			setMaxBtnDisabled(true);
		}
	}, [sumRoomGuest]);
	return (
		<Col className='roomAllocation'>
			<Col className='title'>
				住客人數: {guest}人/ {room}房
			</Col>
			<Row className='guestAllocationBox'>尚未分配人數 {guest - sumRoomGuest} 人</Row>
			{Array.apply(null, Array(room > guest ? guest : room)).map((x, i, array) => (
				<Col key={i}>
					<RoomBlock
						key={i}
						roomGuestMax={roomGuestMax}
						onRoomChange={(roomResult: any) => handleResult(i, roomResult)}
						isMinBtnDisabled={isMinBtnDisabled}
						isMaxBtnDisabled={isMaxBtnDisabled}
					/>
					{array.length - 1 !== i && <Divider />}
				</Col>
			))}
		</Col>
	);
}
