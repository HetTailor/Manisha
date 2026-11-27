export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  suggestedImageText: string;
  searchKeyword: string;
  aspectRatio: string;
  sampleItems: string[];
  specs: {
    paperOptions: string;
    commonSizes: string;
    finishes: string;
    idealFor: string;
  };
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'visiting-cards' | 'wedding-cards' | 'pharma' | 'books' | 'brochures' | 'stationery' | 'custom';
  categoryLabel: string;
  client: string;
  specs: string;
  paperStock: string;
  finishing: string;
  suggestedImage: string;
  searchKeyword: string;
  description: string;
  imageUrl?: string;
}

export interface ImageSuggestionGuide {
  sectionId: string;
  sectionName: string;
  description: string;
  suggestedSubject: string;
  exactSearchKeyword: string;
  aspectRatio: string;
  recommendedResolution: string;
  placementLocation: string;
}
