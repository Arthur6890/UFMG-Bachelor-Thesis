import React from 'react';

type Props = {
	height?: string;
	width?: string;
};

export default function Spacer({
	height,
	width,
}: Props) {
	return (
		<div style={{ height, width }} />
	);
}
