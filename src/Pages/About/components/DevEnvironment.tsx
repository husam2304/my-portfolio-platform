export const DevEnvironment = () => {
    const environment = [
        {
            icon: 'computer',
            title: 'COMPUTE_UNIT',
            description: 'Apple M2 Max • 64GB RAM • 2TB SSD',
        },
        {
            icon: 'terminal',
            title: 'IDE_ENVIRONMENT',
            description: 'Neovim (Custom Lua) • JetBrains Mono Nerd Font',
        },
        {
            icon: 'keyboard',
            title: 'INPUT_PERIPHERAL',
            description: 'Custom Split Ortho • Gateron Oil Kings',
        },
    ];

    return (
        <section className="mb-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-5">
                    <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6">The Sandbox</h2>
                    <p className="text-body-md text-on-surface-variant mb-8 leading-relaxed">
                        My environment is tuned for focus. I believe the quality of the toolchain directly impacts the
                        clarity of the logic. My workspace is a minimalist cockpit designed for deep work and rapid iteration.
                    </p>
                    <ul className="space-y-6">
                        {environment.map((item) => (
                            <li key={item.title} className="flex items-start gap-4">
                                <span className="material-symbols-outlined text-primary-fixed-dim mt-1">{item.icon}</span>
                                <div>
                                    <h4 className="font-label-caps text-on-surface">{item.title}</h4>
                                    <p className="text-code-sm text-outline">{item.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="lg:col-span-7">
                    <div className="relative w-full aspect-video glass-card overflow-hidden">
                        <img
                            className="object-cover w-full h-full opacity-80 hover:opacity-100 transition-opacity duration-500"
                            alt="A ultra-clean, minimalist desk setup in a dark-themed tech studio. A single wide curved monitor displays complex code snippets in a vibrant cyan syntax theme. A custom mechanical split keyboard sits on a dark felt mat beside a minimalist trackpad. Subdued blue ambient lighting glows from behind the monitor, casting soft shadows in a sleek, industrial corporate modern setting."
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlmOHnEMfc3I9gAehRxZOdZqFWCZAVFyt0Ap0Ni4ZUUcxbgplzad8d3XRmpv3cl7NliVDx3aYF7uAg4wpT8t6XlSHJJpAYJEozeLuzULeeBW1HmLyqBS6dddUY4BvhqEYUhFVr7RsFaIvYyaN5l8Yg9rHXsWiaz296WCqm3W65PyTQonU3zG2FO30lJAIRESbS0xGRUGFoUeojdFKNt5Ov8HDP2WatDDV-z59PdoN5mEuh9KyL_LCwcz5Lt17kAIhzk1o1o6c_JhW-"
                        />
                        <div className="absolute top-4 left-4 flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-error"></div>
                            <div className="w-3 h-3 rounded-full bg-secondary-container"></div>
                            <div className="w-3 h-3 rounded-full bg-primary-fixed-dim"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
