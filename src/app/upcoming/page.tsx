import Link from 'next/link'

interface Event {
  id: number;
  date: string;
  title: string;
  venue: string;
  description: string;
}

function getUpcomingEvents(): Event[] {
  return [
    {
      id: 1,
      date: '2024-02-15',
      title: 'Solo Recital at Carnegie Hall',
      venue: 'Carnegie Hall, New York',
      description: 'A beautiful evening of classical piano music featuring works by Chopin and Liszt.'
    },
    {
      id: 2,
      date: '2024-03-02',
      title: 'Chamber Music Festival',
      venue: 'Lincoln Center, New York',
      description: 'Performing Beethoven\'s Piano Trio No. 7 in B-flat major with renowned string musicians.'
    },
    {
      id: 3,
      date: '2024-03-20',
      title: 'Masterclass Series',
      venue: 'Juilliard School, New York',
      description: 'Teaching a masterclass on Romantic era piano performance techniques.'
    },
    {
      id: 4,
      date: '2024-04-10',
      title: 'Orchestral Debut',
      venue: 'Metropolitan Opera House, New York',
      description: 'Performing Rachmaninoff\'s Piano Concerto No. 2 with the Metropolitan Orchestra.'
    }
  ]
}

export default function UpcomingPage() {
  const events = getUpcomingEvents();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-serif text-center mb-12">Upcoming Performances</h1>
        <p className="text-center text-gray-600 mb-8">Check out the upcoming concert schedule</p>
        
        <div className="space-y-10">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-serif">{event.title}</h2>
                    <p className="text-gray-600 mt-1">{event.venue}</p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <p className="text-lg font-medium bg-amber-100 text-amber-800 py-2 px-4 rounded inline-block">
                      {new Date(event.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700">{event.description}</p>
                <div className="mt-4">
                  <button className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-6 rounded transition duration-300">
                    Get Tickets
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/" className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-8 rounded transition duration-300">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}