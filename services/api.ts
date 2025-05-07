interface RoverResponse {
  success: boolean;
  message?: string;
  data?: {
    movement?: string;
    sensor_data?: string;
    detection?: string;
    battery_level?: number;
    unity_viewer?: string;
  };
}

class ThinkVApi {
  private baseUrl: string;
  private channelId: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.thinkv.io';
    this.channelId = process.env.NEXT_PUBLIC_CHANNEL_ID;
    this.apiKey = process.env.NEXT_PUBLIC_API_KEY;
}

  async readData(): Promise<RoverResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/channels/${this.channelId}`);
      const data = await response.json();
      return {
        success: true,
        data
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch rover data'
      };
    }
  }

  async updateData(fieldNumber: number, value: any): Promise<RoverResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/update`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          channel_id: this.channelId,
          api_key: this.apiKey,
          [`field${fieldNumber}`]: value
        }),
      });
      const data = await response.json();
      return {
        success: true,
        data
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update rover data'
      };
    }
  }

  async updateMultipleFields(values: Record<string, any>): Promise<RoverResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/update_multiple`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          channel_id: this.channelId,
          api_key: this.apiKey,
          field_values: values
        }),
      });
      const data = await response.json();
      return {
        success: true,
        data
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update multiple fields'
      };
    }
  }
}

// Export a single instance of the API
export const thinkVApi = new ThinkVApi();