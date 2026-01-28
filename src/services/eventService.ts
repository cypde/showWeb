import { supabase } from '@/utils/supabase';

export interface Event {
  id: number;
  title: string;
  date: string; // ISO date string
  venue: string;
  description: string;
  created_at?: string;
}

// Service functions for managing events
export const eventService = {
  // Fetch all upcoming events
  async getUpcomingEvents(): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });
      
    if (error) {
      console.error('Error fetching events:', error);
      throw new Error('Failed to fetch events');
    }
    
    return data as Event[];
  },

  // Fetch a single event by ID
  async getEventById(id: number): Promise<Event | null> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      if (error.code === 'PGRST116') {
        // Item not found
        return null;
      }
      console.error('Error fetching event:', error);
      throw new Error('Failed to fetch event');
    }
    
    return data as Event;
  },

  // Add a new event (requires authentication)
  async addEvent(event: Omit<Event, 'id' | 'created_at'>): Promise<Event> {
    const { data, error } = await supabase
      .from('events')
      .insert([event])
      .select()
      .single();
      
    if (error) {
      console.error('Error adding event:', error);
      throw new Error('Failed to add event');
    }
    
    return data as Event;
  },

  // Update an existing event (requires authentication)
  async updateEvent(id: number, updates: Partial<Event>): Promise<Event> {
    const { data, error } = await supabase
      .from('events')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
      
    if (error) {
      console.error('Error updating event:', error);
      throw new Error('Failed to update event');
    }
    
    return data as Event;
  },

  // Delete an event (requires authentication)
  async deleteEvent(id: number): Promise<void> {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error('Error deleting event:', error);
      throw new Error('Failed to delete event');
    }
  }
};