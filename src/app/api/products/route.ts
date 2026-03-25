import { supabase } from '@/lib/adminDB';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const count = req.nextUrl.searchParams.get('count');

	const { data } = await supabase
		.from('products')
		.select('*')
		.limit(count ? Number(count) : 10);

	if (!data || data.length === 0) {
		return NextResponse.json(
			{ success: false, data: 'Products not found' },
			{ status: 404 }
		);
	};

	return NextResponse.json({ success: true, data });
};

export async function POST(req: NextRequest) {
	try {
		const { name, description, price } = await req.json();

		// TODO: add validation

		const { statusText, error } = await supabase
			.from('products')
			.insert({ name, description, price });

		if (error) {
			console.log(error);
			return NextResponse.json(
				{ success: false, data: error.message },
				{ status: 400 }
			);
		};

		return NextResponse.json({ success: true, data: statusText });
	} catch (error) {
		console.log(error)
		return NextResponse.json(
			{ success: false, data: (error as Error).message },
			{ status: 400 }
		);
	};
};
