        // Data for Process Flow
        const processSteps = [
            { step: 1, title: "Pre-expansion", description: "Controlled expansion of EPS beads to achieve required pattern density." },
            { step: 2, title: "Moulding", description: "Injecting the expanded foam beads into a mould to create the pattern shape." },
            { step: 3, title: "Assembly", description: "Gluing the individual foam patterns to a gating system (sprue) to form a cluster." },
            { step: 4, title: "Coating", description: "Dipping the cluster into a refractory coating slurry and allowing it to dry." },
            { step: 5, title: "Drying", description: "Allowing the refractory coating to fully cure, forming the mold shell." },
            { step: 6, title: "Sand Filling & Compaction", description: "Placing the coated cluster into a flask, filling it with unbonded sand, and vibrating (compaction) to create a dense mold." },
            { step: 7, title: "Vacuum & Pouring", description: "Applying a vacuum to the flask to stabilize the sand, then pouring molten metal. The metal vaporizes the foam, taking its exact shape." },
            { step: 8, title: "Shake-out", description: "Removing the flask and shaking out the casting from the now-free sand." },
            { step: 9, "title": "Fettling & Cleaning", description: "Separating the finished casting from the sprue and initial cleaning." },
            { step: 10, title: "Machining", description: "Final precision finishing work, minimized due to the LFC process's inherent accuracy." },
        ];

        // Function to render process steps
        function renderProcessSteps() {
            const container = document.getElementById('process-flow');
            let html = '';
            processSteps.forEach(stepData => {
                html += `
                    <div class="process-step flex items-start space-x-4 fade-in-on-scroll">
                        <div class="step-icon-container">
                            ${stepData.step}
                        </div>
                        <div>
                            <h4 class="text-xl font-semibold text-gray-900 mt-1">${stepData.title}</h4>
                            <p class="text-gray-700 mt-1">${stepData.description}</p>
                        </div>
                    </div>
                `;
            });
            container.innerHTML = html;
        }

        // --- Core JS Functionality ---

        document.addEventListener('DOMContentLoaded', () => {
            renderProcessSteps();
            document.getElementById('current-year').textContent = new Date().getFullYear();

            // 1. Mobile Menu Toggle
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');

            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                mobileMenuButton.querySelector('i').setAttribute('data-lucide', mobileMenu.classList.contains('hidden') ? 'menu' : 'x');
                lucide.createIcons();
            });

            // Close mobile menu on link click
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                    mobileMenuButton.querySelector('i').setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                });
            });


            // 2. Tab Functionality for Products
            const tabButtons = document.querySelectorAll('.tab-button');
            const tabContents = document.querySelectorAll('.tab-content');

            tabButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const targetId = e.currentTarget.dataset.target;

                    // Deactivate all buttons (updated colors for light theme)
                    tabButtons.forEach(btn => {
                        btn.classList.remove('active-tab', 'border-primary', 'text-gray-900', 'hover:border-gray-400');
                        btn.classList.add('border-transparent', 'text-gray-500', 'hover:text-gray-700');
                    });

                    // Hide all contents
                    tabContents.forEach(content => {
                        content.classList.add('hidden');
                    });

                    // Activate clicked button (updated colors for light theme)
                    e.currentTarget.classList.add('active-tab', 'border-primary', 'text-gray-900');
                    e.currentTarget.classList.remove('border-transparent', 'text-gray-500', 'hover:text-gray-700');

                    // Show target content
                    document.getElementById(targetId).classList.remove('hidden');
                });
            });


            // 3. Scroll Animation Logic (Observer API)
            const faders = document.querySelectorAll('.fade-in-on-scroll');

            const appearOptions = {
                threshold: 0,
                rootMargin: "0px 0px -100px 0px" // Start 100px before reaching bottom
            };

            const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        return;
                    } else {
                        entry.target.classList.add('is-visible');
                        appearOnScroll.unobserve(entry.target);
                    }
                });
            }, appearOptions);

            faders.forEach(fader => {
                appearOnScroll.observe(fader);
            });
        });