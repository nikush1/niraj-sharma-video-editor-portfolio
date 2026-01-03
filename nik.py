# Video Metadata Analyzer & Optimizer
# Python script for analyzing and optimizing video metadata for social media

import json
from datetime import datetime
from typing import Dict, List, Tuple
import random

class VideoAnalyzer:
    """Analyzes video metadata for optimal social media performance"""
    
    def __init__(self):
        self.platforms = ['YouTube', 'Instagram', 'TikTok', 'Twitter']
        self.optimal_aspect_ratios = {
            'YouTube': (16, 9),
            'Instagram': (1, 1),
            'TikTok': (9, 16),
            'Twitter': (16, 9)
        }
    
    def analyze_video(self, video_path: str) -> Dict:
        """Analyzes video file and returns optimization suggestions"""
        
        # Mock video analysis - in real implementation, this would use OpenCV
        mock_data = {
            'filename': video_path.split('/')[-1],
            'platform': random.choice(self.platforms),
            'duration': random.uniform(15, 180),
            'size_mb': random.uniform(5, 200),
            'aspect_ratio': random.choice(['16:9', '9:16', '1:1', '4:5']),
            'created_at': datetime.now().isoformat(),
            'engagement_score': random.uniform(0.5, 1.0)
        }
        
        return mock_data
    
    def optimize_for_platform(self, video_data: Dict, target_platform: str) -> Dict:
        """Generates optimization recommendations for specific platform"""
        
        recommendations = []
        
        # Check aspect ratio
        current_ratio = video_data['aspect_ratio']
        target_ratio = self.optimal_aspect_ratios[target_platform]
        
        if current_ratio != f"{target_ratio[0]}:{target_ratio[1]}":
            recommendations.append(
                f"Change aspect ratio to {target_ratio[0]}:{target_ratio[1]} for {target_platform}"
            )
        
        # Duration optimization
        optimal_durations = {
            'YouTube': (120, 600),
            'Instagram': (15, 60),
            'TikTok': (15, 60),
            'Twitter': (15, 140)
        }
        
        min_dur, max_dur = optimal_durations[target_platform]
        current_dur = video_data['duration']
        
        if current_dur < min_dur:
            recommendations.append(
                f"Video too short ({current_dur:.1f}s). Optimal: {min_dur}-{max_dur}s"
            )
        elif current_dur > max_dur:
            recommendations.append(
                f"Video too long ({current_dur:.1f}s). Optimal: {min_dur}-{max_dur}s"
            )
        
        # File size optimization
        max_sizes = {
            'YouTube': 128,
            'Instagram': 100,
            'TikTok': 72,
            'Twitter': 512
        }
        
        if video_data['size_mb'] > max_sizes[target_platform]:
            recommendations.append(
                f"Compress video: {video_data['size_mb']:.1f}MB > {max_sizes[target_platform]}MB"
            )
        
        return {
            'platform': target_platform,
            'current_metrics': video_data,
            'recommendations': recommendations,
            'optimization_score': calculate_optimization_score(recommendations)
        }
    
    def batch_analyze(self, video_paths: List[str]) -> List[Dict]:
        """Analyzes multiple videos in batch"""
        results = []
        for path in video_paths:
            analysis = self.analyze_video(path)
            results.append(analysis)
        
        # Sort by engagement score (descending)
        return sorted(results, key=lambda x: x['engagement_score'], reverse=True)

def calculate_optimization_score(recommendations: List[str]) -> float:
    """Calculates optimization score based on number of recommendations"""
    if not recommendations:
        return 1.0
    return max(0.1, 1.0 - len(recommendations) * 0.2)

def generate_hashtags(category: str, count: int = 5) -> List[str]:
    """Generates relevant hashtags for video category"""
    
    hashtag_db = {
        'fitness': ['workout', 'fitness', 'gym', 'health', 'training'],
        'food': ['foodie', 'recipe', 'cooking', 'delicious', 'homemade'],
        'travel': ['wanderlust', 'travel', 'adventure', 'explore', 'vacation'],
        'tech': ['technology', 'gadgets', 'innovation', 'tech', 'digital'],
        'comedy': ['funny', 'comedy', 'humor', 'laugh', 'memes']
    }
    
    base_tags = hashtag_db.get(category, ['viral', 'trending', 'video'])
    
    # Add platform-specific hashtags
    platform_tags = ['reels', 'shorts', 'viralvideo', 'contentcreator']
    
    return base_tags[:count] + random.sample(platform_tags, min(3, len(platform_tags)))

def main():
    """Main function demonstrating video analysis workflow"""
    
    print("=" * 60)
    print("VIDEO METADATA ANALYZER & OPTIMIZER")
    print("=" * 60)
    
    # Initialize analyzer
    analyzer = VideoAnalyzer()
    
    # Sample video files
    sample_videos = [
        "/videos/workout_routine.mp4",
        "/videos/tech_review.mp4",
        "/videos/travel_vlog.mp4"
    ]
    
    print(f"\n📊 Analyzing {len(sample_videos)} videos...")
    
    # Batch analysis
    results = analyzer.batch_analyze(sample_videos)
    
    for i, result in enumerate(results, 1):
        print(f"\n📁 Video {i}: {result['filename']}")
        print(f"   Platform: {result['platform']}")
        print(f"   Duration: {result['duration']:.1f}s")
        print(f"   Size: {result['size_mb']:.1f}MB")
        print(f"   Aspect Ratio: {result['aspect_ratio']}")
        print(f"   Engagement Score: {result['engagement_score']:.2f}")
    
    # Optimize first video for different platforms
    print("\n" + "=" * 60)
    print("OPTIMIZATION RECOMMENDATIONS")
    print("=" * 60)
    
    test_video = results[0]
    
    for platform in ['YouTube', 'Instagram', 'TikTok']:
        optimization = analyzer.optimize_for_platform(test_video, platform)
        
        print(f"\n🎯 Optimization for {platform}:")
        print(f"   Score: {optimization['optimization_score']:.1f}/1.0")
        
        if optimization['recommendations']:
            print(f"   Recommendations:")
            for rec in optimization['recommendations']:
                print(f"   • {rec}")
        else:
            print(f"   ✅ Video is already optimized for {platform}")
    
    # Generate hashtags
    print("\n" + "=" * 60)
    print("HASHTAG GENERATOR")
    print("=" * 60)
    
    for category in ['fitness', 'travel', 'tech']:
        hashtags = generate_hashtags(category)
        print(f"\n#{category}: {' '.join(['#' + tag for tag in hashtags])}")
    
    print("\n" + "=" * 60)
    print("✅ Analysis complete! Ready for video editing workflow.")
    print("=" * 60)

if __name__ == "__main__":
    # Run the analyzer
    main()
