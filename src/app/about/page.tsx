export default function About(){
    return (
        <main className="p-5 max-w-2xl mx-auto space-y-2">
            <div className="text-2xl font-medium">About Us</div>
            <p>Workshop Registration System — find workshops, add them to your cart and confirm your registration.</p>
            <ul className="list-disc ml-5 text-gray-700">
                <li>Workshop date cannot be before today</li>
                <li>Registrations cannot exceed the workshop capacity</li>
                <li>Only 1 registration per workshop</li>
                <li>At most 3 active workshop registrations per member</li>
                <li>Cannot register after the workshop date</li>
            </ul>
        </main>
    );
}
