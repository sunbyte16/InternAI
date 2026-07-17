export class RecommendationEngine {
  static calculateMatchScore(studentProfile, internship) {
    let score = 0;
    let maxScore = 0;
    let matchReasons = [];

    // Skills matching (40% weight)
    const skillWeight = 40;
    const studentSkills = studentProfile.skills.map(s => s.toLowerCase());
    const requiredSkills = internship.requiredSkills.map(s => s.toLowerCase());
    
    const matchingSkills = requiredSkills.filter(skill => 
      studentSkills.some(studentSkill => 
        studentSkill.includes(skill) || skill.includes(studentSkill)
      )
    );
    
    const skillMatchPercentage = matchingSkills.length / requiredSkills.length;
    score += skillMatchPercentage * skillWeight;
    maxScore += skillWeight;
    
    if (matchingSkills.length > 0) {
      matchReasons.push(`${matchingSkills.length}/${requiredSkills.length} required skills match`);
    }

    // Academic year matching (20% weight)
    const yearWeight = 20;
    if (internship.preferredYear.includes(studentProfile.academicYear)) {
      score += yearWeight;
      matchReasons.push(`Perfect fit for ${studentProfile.academicYear} year students`);
    } else {
      // Partial score for close years
      const yearMap = { "2nd": 2, "3rd": 3, "4th": 4 };
      const studentYearNum = yearMap[studentProfile.academicYear];
      const closestYear = internship.preferredYear.reduce((closest, year) => {
        const yearNum = yearMap[year];
        const closestNum = yearMap[closest];
        return Math.abs(yearNum - studentYearNum) < Math.abs(closestNum - studentYearNum) ? year : closest;
      });
      const yearDiff = Math.abs(yearMap[closestYear] - studentYearNum);
      score += Math.max(0, yearWeight - (yearDiff * 5));
    }
    maxScore += yearWeight;

    // Interest/Category matching (25% weight)
    const interestWeight = 25;
    const categoryMatch = studentProfile.interests.some(interest => {
      const interestLower = interest.toLowerCase();
      const categoryLower = internship.category.toLowerCase();
      return interestLower.includes(categoryLower) || 
             categoryLower.includes(interestLower) ||
             this.getCategoryKeywords(categoryLower).some(keyword => 
               interestLower.includes(keyword)
             );
    });
    
    if (categoryMatch) {
      score += interestWeight;
      matchReasons.push(`Matches your interest in ${internship.category}`);
    }
    maxScore += interestWeight;

    // Internship type preference (15% weight)
    const typeWeight = 15;
    if (studentProfile.preferredType === internship.type || studentProfile.preferredType === "Any") {
      score += typeWeight;
      matchReasons.push(`${internship.type} work matches your preference`);
    } else if (internship.type === "Hybrid") {
      // Hybrid is somewhat compatible with both remote and on-site preferences
      score += typeWeight * 0.7;
      matchReasons.push(`Hybrid option offers flexibility`);
    }
    maxScore += typeWeight;

    const finalScore = Math.round((score / maxScore) * 100);
    
    return {
      score: finalScore,
      matchReasons: matchReasons,
      matchingSkills: matchingSkills
    };
  }

  static getCategoryKeywords(category) {
    const keywordMap = {
      'web': ['frontend', 'backend', 'full stack', 'development'],
      'data': ['analytics', 'science', 'analysis', 'statistics'],
      'ai': ['machine learning', 'artificial intelligence', 'ml', 'deep learning'],
      'mobile': ['app', 'ios', 'android', 'react native'],
      'testing': ['qa', 'quality assurance', 'automation'],
      'devops': ['cloud', 'infrastructure', 'deployment'],
      'design': ['ui', 'ux', 'user interface', 'user experience'],
      'security': ['cyber', 'information security', 'network security']
    };
    
    return keywordMap[category] || [];
  }

  static getRecommendations(studentProfile, internships) {
    const recommendations = internships.map(internship => {
      const matchData = this.calculateMatchScore(studentProfile, internship);
      return {
        ...internship,
        matchScore: matchData.score,
        matchReasons: matchData.matchReasons,
        matchingSkills: matchData.matchingSkills
      };
    });

    // Sort by match score (descending) and return top matches
    return recommendations
      .sort((a, b) => b.matchScore - a.matchScore)
      .filter(rec => rec.matchScore > 20); // Only show recommendations with >20% match
  }

  static getMatchLevel(score) {
    if (score >= 80) return { level: "Excellent", color: "text-green-600", bgColor: "bg-green-100" };
    if (score >= 60) return { level: "Good", color: "text-blue-600", bgColor: "bg-blue-100" };
    if (score >= 40) return { level: "Fair", color: "text-yellow-600", bgColor: "bg-yellow-100" };
    return { level: "Low", color: "text-red-600", bgColor: "bg-red-100" };
  }
}