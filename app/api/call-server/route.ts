// app/api/call-server/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Интерфейс для ответа сервера
interface ServerResponse {
  message: string;
  data?: any;
  error?: string;
}

// Конфигурация axios с базовым URL
const apiClient = axios.create({
  baseURL: 'http://server_c:3000/api',
});

// GET - получение данных с сервера
export async function GET() {
  try {
    const response = await apiClient.get('/data');
    return NextResponse.json({
      message: 'GET request successful',
      data: response.data,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to call the server' },
      { status: 500 }
    );
  }
}

// POST - отправка данных на сервер
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await apiClient.post('/data', body);
    return NextResponse.json({
      message: 'POST request successful',
      data: response.data,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to call the server' },
      { status: 500 }
    );
  }
}

// PUT - обновление данных на сервере
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;
    const numericId = Number(id);

    if (isNaN(numericId)) {
      return NextResponse.json(
        { error: 'Invalid ID' },
        { status: 400 }
      );
    }

    const response = await apiClient.put('/data/', body);
    return NextResponse.json({
      message: 'PUT request successful',
      data: response.data,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to call the server' },
      { status: 500 }
    );
  }
}

// DELETE - удаление данных с сервера
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get('id'));

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid ID' },
        { status: 400 }
      );
    }

    const response = await apiClient.delete(`/data?id=${id}`);
    return NextResponse.json({
      message: 'DELETE request successful',
      data: response.data,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to call the server' },
      { status: 500 }
    );
  }
}