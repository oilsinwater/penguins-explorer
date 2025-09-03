## Palmer Penguins Explorer - UX Wireframes & User Flow

### Desktop Wireframe - Data Table View

```
┌────────────────────────────────────────────────────────────────────────────┐
│ 🐧 Palmer Penguins Explorer                              Help | Export | ⚙️ │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│ ┌─────────────────────┐ ┌────────────────────────────────────────────────┐│
│ │ FILTERS           ▼ │ │ [Table View] [Visualizations]                  ││
│ ├─────────────────────┤ ├────────────────────────────────────────────────┤│
│ │ Species:            │ │                                                ││
│ │ ☑ Adelie (152)      │ │ Showing 344 penguins          Download CSV ↓ ││
│ │ ☑ Chinstrap (68)    │ │                                                ││
│ │ ☑ Gentoo (124)      │ │ ┌──────────────────────────────────────────┐ ││
│ │                     │ │ │ Species ↕ │ Island ↕ │ Bill │ Body Mass ↕│ ││
│ ├─────────────────────┤ │ ├───────────┼──────────┼──────┼─────────────┤ ││
│ │ Island:             │ │ │ Adelie    │ Torgersen│ 39.1 │ 3750        │ ││
│ │ [All islands    ▼] │ │ │ Adelie    │ Torgersen│ 39.5 │ 3800        │ ││
│ │                     │ │ │ Adelie    │ Torgersen│ 40.3 │ —           │ ││
│ ├─────────────────────┤ │ │ Gentoo    │ Biscoe   │ 46.1 │ 5200        │ ││
│ │ Sex:                │ │ │ Chinstrap │ Dream    │ 48.7 │ 3775        │ ││
│ │ ◉ All               │ │ │ ...       │ ...      │ ...  │ ...         │ ││
│ │ ○ Male              │ │ └──────────────────────────────────────────┘ ││
│ │ ○ Female            │ │                                                ││
│ │                     │ │ Showing 1-20 of 344  [1] 2 3 ... 18 [Next>] ││
│ └─────────────────────┘ └────────────────────────────────────────────────┘│
│                                                                            │
│ [Clear all filters]                                                        │
└────────────────────────────────────────────────────────────────────────────┘
```

### Desktop Wireframe - Visualization View

```
┌────────────────────────────────────────────────────────────────────────────┐
│ 🐧 Palmer Penguins Explorer                              Help | Export | ⚙️ │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│ ┌─────────────────────┐ ┌────────────────────────────────────────────────┐│
│ │ FILTERS           ▼ │ │ [Table View] [Visualizations]                  ││
│ ├─────────────────────┤ ├────────────────────────────────────────────────┤│
│ │ Species:            │ │ Chart Type: [Scatter Plot ▼] [📊] [📈] [📉]   ││
│ │ ☑ Adelie (152)      │ ├────────────────────────────────────────────────┤│
│ │ ☐ Chinstrap (0)     │ │                                                ││
│ │ ☑ Gentoo (124)      │ │ X-Axis: [Bill Length (mm) ▼]  Download PNG ↓  ││
│ │                     │ │ Y-Axis: [Body Mass (g)    ▼]                  ││
│ ├─────────────────────┤ │                                                ││
│ │ Island:             │ │ Body Mass vs Bill Length                       ││
│ │ [Biscoe       ▼]    │ │ 6000┤                              ● Gentoo    ││
│ │                     │ │     │                          ●●●               ││
│ ├─────────────────────┤ │ 5000┤                    ●●●●●                   ││
│ │ Sex:                │ │     │              ●●●●●●                         ││
│ │ ◉ All               │ │ 4000┤      ▲▲▲▲▲▲                                ││
│ │ ○ Male              │ │     │  ▲▲▲▲    ▲▲                                ││
│ │ ○ Female            │ │ 3000┤▲▲                          ▲ Adelie        ││
│ │                     │ │     └────────────────────────────               ││
│ └─────────────────────┘ │      35    40    45    50    55                 ││
│                         │                Bill Length (mm)                  ││
│ [Clear all filters]     └────────────────────────────────────────────────┘│
└────────────────────────────────────────────────────────────────────────────┘
```

### Mobile Wireframe

```
┌─────────────────────┐
│ 🐧 Palmer Penguins  │
│ ☰ Filters    ⋮ Menu │
├─────────────────────┤
│ [Table] [Charts]    │
├─────────────────────┤
│ 276 penguins shown  │
├─────────────────────┤
│ ┌─────────────────┐ │
│ │ Species │ Island││ │
│ ├─────────┼───────┤ │
│ │ Adelie  │ Biscoe│ │
│ │ Gentoo  │ Biscoe│ │
│ │ Adelie  │ Biscoe│ │
│ └─────────────────┘ │
│ [← Prev] 1/14 [→]   │
└─────────────────────┘

Filter Panel (Overlay):
┌─────────────────────┐
│ ← Filters        ✕  │
├─────────────────────┤
│ Species:            │
│ ☑ Adelie (152)      │
│ ☑ Chinstrap (68)    │
│ ☑ Gentoo (124)      │
├─────────────────────┤
│ Island:             │
│ [All islands    ▼]  │
├─────────────────────┤
│ Sex:                │
│ ◉ All               │
│ ○ Male              │
│ ○ Female            │
├─────────────────────┤
│ [Clear all filters] │
│ [Apply]             │
└─────────────────────┘
```

### User Flow Diagram

```
                            ┌─────────────────┐
                            │   First Visit   │
                            └────────┬────────┘
                                     │
                                     ▼
                         ┌──────────────────────┐
                         │   Welcome Modal      │
                         │ • Dataset overview   │
                         │ • Variable guide     │
                         │ • Quick tutorial    │
                         └──────────┬───────────┘
                                    │
                  ┌─────────────────┴─────────────────┐
                  │                                   │
                  ▼                                   ▼
         ┌──────────────────┐              ┌──────────────────┐
         │  Data Table View │◄────────────►│ Visualization    │
         │                  │              │     View         │
         └────────┬─────────┘              └────────┬─────────┘
                  │                                   │
                  │                                   │
    ┌─────────────┴────────────┐        ┌───────────┴────────────┐
    │                          │        │                         │
    ▼                          ▼        ▼                         ▼
┌─────────┐            ┌──────────┐ ┌─────────┐          ┌──────────┐
│ Filter  │            │  Sort    │ │ Select  │          │ Configure│
│ Data    │            │ Columns  │ │ Chart   │          │ Axes     │
└────┬────┘            └────┬─────┘ └────┬────┘          └────┬─────┘
     │                      │             │                     │
     └──────────┬───────────┘             └─────────┬──────────┘
                │                                   │
                ▼                                   ▼
        ┌──────────────┐                   ┌──────────────┐
        │ View Filtered│                   │ View Chart   │
        │ Results      │                   │ Update Live  │
        └──────┬───────┘                   └──────┬───────┘
               │                                   │
               └────────────┬──────────────────────┘
                            │
                            ▼
                    ┌──────────────┐
                    │ Export/Share │
                    │ • PNG/CSV    │
                    │ • Copy URL   │
                    └──────────────┘
```

### Filter Interaction States

```
Species Filter States:
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ ☑ Adelie (152)  │    │ ☐ Adelie (0)    │    │ ☑ Adelie (87)   │
│ ☑ Chinstrap(68) │ => │ ☑ Chinstrap(68) │ => │ ☑ Chinstrap(36) │
│ ☑ Gentoo (124)  │    │ ☑ Gentoo (124)  │    │ ☑ Gentoo (124)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
   All Selected         Adelie Hidden          Island Filtered

Visual Feedback:
• Check animation on toggle
• Count updates in real-time
• Strikethrough for 0 results
• Loading spinner during update
```

### Visualization Selection Flow

```
┌────────────────────────────────────────────────────┐
│              Chart Type Selection                  │
├────────────────────────────────────────────────────┤
│                                                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │    📊    │  │    📈    │  │    📉    │       │
│  │ Scatter  │  │Histogram │  │ Box Plot │       │
│  │  Plot    │  │          │  │          │       │
│  └────┬─────┘  └──────────┘  └──────────┘       │
│       │                                           │
│       ▼                                           │
│  ┌─────────────────────────────────┐             │
│  │ X: [Bill Length ▼]              │             │
│  │ Y: [Body Mass   ▼]              │             │
│  │ ─────────────────               │             │
│  │ • Color by species              │             │
│  │ • Show trend lines              │             │
│  └─────────────────────────────────┘             │
└────────────────────────────────────────────────────┘
```

### Data Exploration Journey

```
1. DISCOVER           2. FILTER              3. VISUALIZE         4. SHARE
┌─────────────┐      ┌─────────────┐       ┌─────────────┐     ┌─────────────┐
│ Browse full │      │ Apply multi │       │ Select best │     │ Export PNG  │
│ dataset in  │ ───► │ -faceted    │ ───► │ chart for   │ ──► │ Share URL   │
│ table view  │      │ filters     │       │ hypothesis  │     │ Download    │
└─────────────┘      └─────────────┘       └─────────────┘     └─────────────┘
      │                     │                      │                   │
      ▼                     ▼                      ▼                   ▼
"344 penguins"      "87 male Adelies"     "Clear correlation"   "bit.ly/xyz"
                     "from Torgersen"       "r² = 0.82"
```

### Responsive Breakpoints

```
Desktop (>1024px)          Tablet (768-1024px)        Mobile (<768px)
┌──────┬──────────┐       ┌────────────────┐         ┌────────────┐
│Filter│  Content │       │ ┌──┐ Content   │         │☰ Full Width│
│Panel │          │       │ │▶ │          │         │   Content  │
│      │          │  ───► │ └──┘          │  ───►   │            │
│Fixed │          │       │ Collapsible   │         │  Overlay   │
└──────┴──────────┘       └────────────────┘         └────────────┘
```

### Key Interaction Patterns

```
Filter Application:
User Action ──► Update Store ──► Update URL ──► Re-render Views
                      │
                      └──► Announce to Screen Reader
                            "Showing 87 penguins"

Chart Navigation:
┌─────────────────────────────────────────┐
│ Keyboard Focus Flow:                    │
│ Tab 1: Chart Type                       │
│ Tab 2: X-Axis Dropdown                  │
│ Tab 3: Y-Axis Dropdown                  │
│ Tab 4: First Data Point                 │
│ Arrow Keys: Navigate Points             │
│ Enter: Show Details                     │
└─────────────────────────────────────────┘
```

This UX design emphasizes:

- Progressive disclosure of complexity
- Clear visual hierarchy
- Immediate feedback on interactions
- Mobile-first responsive approach
- Accessibility-first navigation
- Scientist-friendly data exploration patterns
