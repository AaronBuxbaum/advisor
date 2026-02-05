import {
  getUserById,
  getUserByEmail,
  getUsersByRole,
  getRequestsByUserId,
  getRequestsByExpertId,
  getPendingRequests,
  createRequest,
  getUserProfile,
  getSurveysByUserId,
  getKnowledgeBasesByOwnerId,
  getKnowledgeBaseById,
  searchKnowledgeEntries,
  getContentItems,
  getContentItemById,
  searchContentItems,
  getProjectsByUserId,
  getProjectById,
  getNotificationsByUserId,
  getUnreadNotificationCount,
  markNotificationAsRead,
  getAISuggestionsForEntity,
  getAISuggestionsByType,
  getContentFeedback,
  getResearchRequests,
  getAllTags,
  getTagsByCategory,
  getCommentsByEntity,
  getExpertStats,
  getAnalystStats,
  getAllPlatforms,
  getPlatformById,
  getPlatformBySlug,
  getPlatformsByType,
  getPlatformsWithApi,
  getUserPlatforms,
  getAllVideos,
  getVideoById,
  getVideosByCategory,
  getVideosByDifficulty,
  getVideosForUser,
  getVideoSourcesForUser,
  getVideoSourceById,
  getRecommendedSourceForUser,
  checkVideoAvailabilityForUser,
  users,
  requests,
  notifications,
  platforms,
  videos,
} from '@/lib/data';

describe('User Functions', () => {
  describe('getUserById', () => {
    it('should return a user when given a valid id', () => {
      const user = getUserById('1');
      expect(user).toBeDefined();
      expect(user?.id).toBe('1');
      expect(user?.name).toBe('John Doe');
      expect(user?.role).toBe('user');
    });

    it('should return undefined for invalid id', () => {
      const user = getUserById('invalid');
      expect(user).toBeUndefined();
    });
  });

  describe('getUserByEmail', () => {
    it('should return a user when given a valid email', () => {
      const user = getUserByEmail('user@example.com');
      expect(user).toBeDefined();
      expect(user?.email).toBe('user@example.com');
    });

    it('should return undefined for invalid email', () => {
      const user = getUserByEmail('invalid@example.com');
      expect(user).toBeUndefined();
    });
  });

  describe('getUsersByRole', () => {
    it('should return all users with the specified role', () => {
      const experts = getUsersByRole('expert');
      expect(experts.length).toBeGreaterThan(0);
      experts.forEach(expert => {
        expect(expert.roles).toContain('expert');
      });
    });

    it('should return analysts correctly', () => {
      const analysts = getUsersByRole('analyst');
      expect(analysts.length).toBeGreaterThan(0);
      analysts.forEach(analyst => {
        expect(analyst.roles).toContain('analyst');
      });
    });
  });
});

describe('Request Functions', () => {
  describe('getRequestsByUserId', () => {
    it('should return requests for a valid user', () => {
      const userRequests = getRequestsByUserId('1');
      expect(userRequests.length).toBeGreaterThan(0);
      userRequests.forEach(request => {
        expect(request.userId).toBe('1');
      });
    });

    it('should return empty array for user with no requests', () => {
      const userRequests = getRequestsByUserId('999');
      expect(userRequests).toEqual([]);
    });
  });

  describe('getRequestsByExpertId', () => {
    it('should return requests assigned to expert', () => {
      const expertRequests = getRequestsByExpertId('2');
      expect(expertRequests.length).toBeGreaterThan(0);
      expertRequests.forEach(request => {
        expect(request.assignedExpertId).toBe('2');
      });
    });
  });

  describe('getPendingRequests', () => {
    it('should return only pending unassigned requests', () => {
      const pending = getPendingRequests();
      pending.forEach(request => {
        expect(request.status).toBe('pending');
        expect(request.assignedExpertId).toBeUndefined();
      });
    });
  });

  describe('createRequest', () => {
    it('should create a new request with generated id and timestamps', () => {
      const initialLength = requests.length;
      const newRequest = createRequest({
        userId: '1',
        title: 'Test Request',
        description: 'Test description',
        type: 'video_recommendation',
        criteria: ['test'],
        tags: ['test'],
        status: 'pending',
        priority: 'normal',
      });

      expect(newRequest.id).toBeDefined();
      expect(newRequest.createdAt).toBeDefined();
      expect(newRequest.updatedAt).toBeDefined();
      expect(newRequest.title).toBe('Test Request');
      expect(requests.length).toBe(initialLength + 1);
    });
  });
});

describe('Profile Functions', () => {
  describe('getUserProfile', () => {
    it('should return profile for valid user', () => {
      const profile = getUserProfile('1');
      expect(profile).toBeDefined();
      expect(profile?.userId).toBe('1');
      expect(profile?.interests).toBeDefined();
      expect(profile?.preferences).toBeDefined();
    });

    it('should return undefined for invalid user', () => {
      const profile = getUserProfile('invalid');
      expect(profile).toBeUndefined();
    });
  });

  describe('getSurveysByUserId', () => {
    it('should return surveys for valid user', () => {
      const surveys = getSurveysByUserId('1');
      expect(surveys.length).toBeGreaterThan(0);
      surveys.forEach(survey => {
        expect(survey.userId).toBe('1');
      });
    });
  });
});

describe('Knowledge Base Functions', () => {
  describe('getKnowledgeBasesByOwnerId', () => {
    it('should return knowledge bases owned by user', () => {
      const kbs = getKnowledgeBasesByOwnerId('2');
      expect(kbs.length).toBeGreaterThan(0);
    });

    it('should include knowledge bases where user is collaborator', () => {
      const kbs = getKnowledgeBasesByOwnerId('4');
      const isOwnerOrCollaborator = kbs.every(
        kb => kb.ownerId === '4' || kb.collaborators.includes('4')
      );
      expect(isOwnerOrCollaborator).toBe(true);
    });
  });

  describe('getKnowledgeBaseById', () => {
    it('should return knowledge base for valid id', () => {
      const kb = getKnowledgeBaseById('kb1');
      expect(kb).toBeDefined();
      expect(kb?.id).toBe('kb1');
    });

    it('should return undefined for invalid id', () => {
      const kb = getKnowledgeBaseById('invalid');
      expect(kb).toBeUndefined();
    });
  });

  describe('searchKnowledgeEntries', () => {
    it('should find entries matching query', () => {
      const results = searchKnowledgeEntries('Python');
      expect(results.length).toBeGreaterThan(0);
    });

    it('should find entries matching tags', () => {
      const results = searchKnowledgeEntries('', ['ML']);
      expect(results.length).toBeGreaterThan(0);
    });

    it('should return empty for no matches', () => {
      const results = searchKnowledgeEntries('nonexistent12345');
      expect(results).toEqual([]);
    });
  });
});

describe('Content Functions', () => {
  describe('getContentItems', () => {
    it('should return all content items without filters', () => {
      const items = getContentItems();
      expect(items.length).toBeGreaterThan(0);
    });

    it('should filter by status', () => {
      const approved = getContentItems({ status: 'approved' });
      approved.forEach(item => {
        expect(item.status).toBe('approved');
      });
    });

    it('should filter by category', () => {
      const tutorials = getContentItems({ category: 'tutorial' });
      tutorials.forEach(item => {
        expect(item.category).toBe('tutorial');
      });
    });

    it('should filter by analyst id', () => {
      const analystContent = getContentItems({ analystId: '3' });
      analystContent.forEach(item => {
        expect(item.analystId).toBe('3');
      });
    });
  });

  describe('getContentItemById', () => {
    it('should return video for valid id', () => {
      const item = getContentItemById('video1');
      expect(item).toBeDefined();
      expect(item?.id).toBe('video1');
    });
  });

  describe('searchContentItems', () => {
    it('should find items matching query', () => {
      const results = searchContentItems('Neural');
      expect(results.length).toBeGreaterThan(0);
    });

    it('should find items matching tags', () => {
      const results = searchContentItems('', ['AI']);
      expect(results.length).toBeGreaterThan(0);
    });
  });
});

describe('Project Functions', () => {
  describe('getProjectsByUserId', () => {
    it('should return projects for user', () => {
      const projects = getProjectsByUserId('4');
      expect(projects.length).toBeGreaterThan(0);
    });
  });

  describe('getProjectById', () => {
    it('should return project for valid id', () => {
      const project = getProjectById('proj1');
      expect(project).toBeDefined();
      expect(project?.id).toBe('proj1');
    });
  });
});

describe('Notification Functions', () => {
  describe('getNotificationsByUserId', () => {
    it('should return notifications for user', () => {
      const notifs = getNotificationsByUserId('2');
      expect(notifs.length).toBeGreaterThan(0);
      notifs.forEach(n => {
        expect(n.userId).toBe('2');
      });
    });
  });

  describe('getUnreadNotificationCount', () => {
    it('should return count of unread notifications', () => {
      const count = getUnreadNotificationCount('3');
      const userNotifs = getNotificationsByUserId('3');
      const unreadCount = userNotifs.filter(n => !n.isRead).length;
      expect(count).toBe(unreadCount);
    });
  });

  describe('markNotificationAsRead', () => {
    it('should mark notification as read', () => {
      // Find an unread notification
      const unreadNotif = notifications.find(n => !n.isRead);
      if (unreadNotif) {
        markNotificationAsRead(unreadNotif.id);
        expect(unreadNotif.isRead).toBe(true);
      }
    });
  });
});

describe('AI Suggestion Functions', () => {
  describe('getAISuggestionsForEntity', () => {
    it('should return suggestions for entity', () => {
      const suggestions = getAISuggestionsForEntity('request', '2');
      suggestions.forEach(s => {
        expect(s.targetEntityType).toBe('request');
        expect(s.targetEntityId).toBe('2');
      });
    });
  });

  describe('getAISuggestionsByType', () => {
    it('should return suggestions of specific type', () => {
      const suggestions = getAISuggestionsByType('content_match');
      suggestions.forEach(s => {
        expect(s.type).toBe('content_match');
      });
    });
  });
});

describe('Feedback Functions', () => {
  describe('getContentFeedback', () => {
    it('should return all feedback without filter', () => {
      const feedback = getContentFeedback();
      expect(feedback.length).toBeGreaterThan(0);
    });

    it('should filter by content item id', () => {
      const feedback = getContentFeedback('content3');
      feedback.forEach(f => {
        expect(f.contentItemId).toBe('content3');
      });
    });
  });

  describe('getResearchRequests', () => {
    it('should return all research requests without filter', () => {
      const requests = getResearchRequests();
      expect(requests.length).toBeGreaterThan(0);
    });

    it('should filter by status', () => {
      const openRequests = getResearchRequests('open');
      openRequests.forEach(r => {
        expect(r.status).toBe('open');
      });
    });
  });
});

describe('Tag Functions', () => {
  describe('getAllTags', () => {
    it('should return all tags', () => {
      const tags = getAllTags();
      expect(tags.length).toBeGreaterThan(0);
    });
  });

  describe('getTagsByCategory', () => {
    it('should return tags for category', () => {
      const techTags = getTagsByCategory('Technology');
      expect(techTags.length).toBeGreaterThan(0);
      techTags.forEach(tag => {
        expect(tag.category).toBe('Technology');
      });
    });
  });
});

describe('Comment Functions', () => {
  describe('getCommentsByEntity', () => {
    it('should return comments for entity', () => {
      const comments = getCommentsByEntity('project', 'proj1');
      expect(comments.length).toBeGreaterThan(0);
      comments.forEach(c => {
        expect(c.entityType).toBe('project');
        expect(c.entityId).toBe('proj1');
      });
    });
  });
});

describe('Analytics Functions', () => {
  describe('getExpertStats', () => {
    it('should return stats for expert', () => {
      const stats = getExpertStats('2');
      expect(stats.totalAssignments).toBeDefined();
      expect(stats.completed).toBeDefined();
      expect(stats.inProgress).toBeDefined();
      expect(stats.averageRating).toBeDefined();
    });
  });

  describe('getAnalystStats', () => {
    it('should return stats for analyst', () => {
      const stats = getAnalystStats('3');
      expect(stats.totalContent).toBeDefined();
      expect(stats.approved).toBeDefined();
      expect(stats.pending).toBeDefined();
      expect(stats.averageQuality).toBeDefined();
    });
  });
});

describe('Platform Functions', () => {
  describe('getAllPlatforms', () => {
    it('should return all platforms', () => {
      const allPlatforms = getAllPlatforms();
      expect(allPlatforms.length).toBeGreaterThan(0);
    });
  });

  describe('getPlatformById', () => {
    it('should return platform for valid id', () => {
      const platform = getPlatformById('youtube');
      expect(platform).toBeDefined();
      expect(platform?.name).toBe('YouTube');
    });

    it('should return undefined for invalid id', () => {
      const platform = getPlatformById('invalid');
      expect(platform).toBeUndefined();
    });
  });

  describe('getPlatformBySlug', () => {
    it('should return platform for valid slug', () => {
      const platform = getPlatformBySlug('coursera');
      expect(platform).toBeDefined();
      expect(platform?.name).toBe('Coursera');
    });
  });

  describe('getPlatformsByType', () => {
    it('should return platforms of a specific type', () => {
      const subscriptionPlatforms = getPlatformsByType('subscription');
      expect(subscriptionPlatforms.length).toBeGreaterThan(0);
      subscriptionPlatforms.forEach(p => {
        expect(p.type).toBe('subscription');
      });
    });
  });

  describe('getPlatformsWithApi', () => {
    it('should return only platforms with API', () => {
      const apiPlatforms = getPlatformsWithApi();
      expect(apiPlatforms.length).toBeGreaterThan(0);
      apiPlatforms.forEach(p => {
        expect(p.hasApi).toBe(true);
      });
    });
  });

  describe('getUserPlatforms', () => {
    it('should return platforms for user subscriptions', () => {
      const userPlatformList = getUserPlatforms('1');
      expect(userPlatformList.length).toBeGreaterThan(0);
    });

    it('should return empty for invalid user', () => {
      const userPlatformList = getUserPlatforms('invalid');
      expect(userPlatformList.length).toBe(0);
    });
  });
});

describe('Video Functions', () => {
  describe('getAllVideos', () => {
    it('should return all videos', () => {
      const allVideos = getAllVideos();
      expect(allVideos.length).toBeGreaterThan(0);
    });
  });

  describe('getVideoById', () => {
    it('should return video for valid id', () => {
      const video = getVideoById('video1');
      expect(video).toBeDefined();
      expect(video?.title).toContain('Neural Networks');
    });

    it('should return undefined for invalid id', () => {
      const video = getVideoById('invalid');
      expect(video).toBeUndefined();
    });
  });

  describe('getVideosByCategory', () => {
    it('should return videos of specific category', () => {
      const tutorials = getVideosByCategory('tutorial');
      expect(tutorials.length).toBeGreaterThan(0);
      tutorials.forEach(v => {
        expect(v.category).toBe('tutorial');
      });
    });
  });

  describe('getVideosByDifficulty', () => {
    it('should return videos of specific difficulty', () => {
      const beginnerVideos = getVideosByDifficulty('beginner');
      expect(beginnerVideos.length).toBeGreaterThan(0);
      beginnerVideos.forEach(v => {
        expect(v.difficulty).toBe('beginner');
      });
    });
  });

  describe('getVideosForUser', () => {
    it('should return videos available to user based on platforms', () => {
      const userVideos = getVideosForUser('1');
      expect(userVideos.length).toBeGreaterThan(0);
    });
  });

  describe('getVideoSourcesForUser', () => {
    it('should return sources available to user', () => {
      const sources = getVideoSourcesForUser('video1', '1');
      expect(sources.length).toBeGreaterThan(0);
    });
  });

  describe('getVideoSourceById', () => {
    it('should return source for valid id', () => {
      const source = getVideoSourceById('vs1-yt');
      expect(source).toBeDefined();
      expect(source?.platformId).toBe('youtube');
    });
  });

  describe('getRecommendedSourceForUser', () => {
    it('should return recommended source for user', () => {
      const source = getRecommendedSourceForUser('video1', '1');
      expect(source).toBeDefined();
    });

    it('should return undefined for unavailable video', () => {
      const source = getRecommendedSourceForUser('invalid', '1');
      expect(source).toBeUndefined();
    });
  });

  describe('checkVideoAvailabilityForUser', () => {
    it('should return availability info for user', () => {
      const availability = checkVideoAvailabilityForUser('video1', '1');
      expect(availability.available).toBeDefined();
      expect(availability.sources).toBeDefined();
      expect(availability.unavailablePlatforms).toBeDefined();
    });

    it('should return not available for invalid video', () => {
      const availability = checkVideoAvailabilityForUser('invalid', '1');
      expect(availability.available).toBe(false);
      expect(availability.sources.length).toBe(0);
    });
  });
});
