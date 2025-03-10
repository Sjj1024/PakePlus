import { convertToLocalTime, initProject } from '@/utils/common'
import { defineStore } from 'pinia'
import githubApi from '@/apis/github'

export const usePakeStore = defineStore('pakeplus', {
    state: () => {
        return {
            // 用户信息
            userInfo: localStorage.getItem('userInfo')
                ? JSON.parse(localStorage.getItem('userInfo') as string)
                : {
                      login: '',
                      id: 0,
                      node_id: '',
                      avatar_url: '',
                      gravatar_id: '',
                      url: '',
                      html_url: 'https://github.com/Sjj1024',
                      followers_url: '',
                      following_url: '',
                      gists_url: '',
                      starred_url: '',
                      subscriptions_url: '',
                      organizations_url: '',
                      repos_url: '',
                      events_url: '',
                      received_events_url: '',
                      type: 'User',
                      site_admin: false,
                      name: '1024小神',
                      company: '',
                      blog: '',
                      location: '',
                      email: null,
                      hireable: null,
                      bio: 'Who am I? \r\nWhere am I? \r\nWhat am I going to do?\r\n',
                      twitter_username: null,
                      notification_email: null,
                      public_repos: 46,
                      public_gists: 1,
                      followers: 120,
                      following: 61,
                      created_at: '2019-03-10T04:28:19Z',
                      updated_at: '2024-08-22T04:54:05Z',
                  },
            // PakePlus仓库信息
            repository: localStorage.getItem('repository')
                ? JSON.parse(localStorage.getItem('repository') as string)
                : {
                      id: 859223110,
                      node_id: 'R_kgDOMza0Rg',
                      name: 'PakePlus',
                      full_name: 'codegirle/PakePlus',
                      private: false,
                      owner: {
                          login: 'codegirle',
                          id: 174768114,
                          node_id: 'U_kgDOCmq_8g',
                          avatar_url:
                              'https://avatars.githubusercontent.com/u/174768114?v=4',
                          gravatar_id: '',
                          url: 'https://api.github.com/users/codegirle',
                          html_url: 'https://github.com/codegirle',
                          followers_url:
                              'https://api.github.com/users/codegirle/followers',
                          following_url:
                              'https://api.github.com/users/codegirle/following{/other_user}',
                          gists_url:
                              'https://api.github.com/users/codegirle/gists{/gist_id}',
                          starred_url:
                              'https://api.github.com/users/codegirle/starred{/owner}{/repo}',
                          subscriptions_url:
                              'https://api.github.com/users/codegirle/subscriptions',
                          organizations_url:
                              'https://api.github.com/users/codegirle/orgs',
                          repos_url:
                              'https://api.github.com/users/codegirle/repos',
                          events_url:
                              'https://api.github.com/users/codegirle/events{/privacy}',
                          received_events_url:
                              'https://api.github.com/users/codegirle/received_events',
                          type: 'User',
                          site_admin: false,
                      },
                      html_url: 'https://github.com/codegirle/PakePlus',
                      description: '',
                      fork: true,
                      url: 'https://api.github.com/repos/codegirle/PakePlus',
                      forks_url: '',
                      keys_url: '',
                      collaborators_url: '',
                      teams_url: '',
                      hooks_url: '',
                      issue_events_url: '',
                      events_url: '',
                      assignees_url: '',
                      branches_url: '',
                      tags_url: '',
                      blobs_url: '',
                      git_tags_url: '',
                      git_refs_url: '',
                      trees_url: '',
                      statuses_url: '',
                      languages_url: '',
                      stargazers_url: '',
                      contributors_url: '',
                      subscribers_url: '',
                      subscription_url: '',
                      commits_url: '',
                      git_commits_url: '',
                      comments_url: '',
                      issue_comment_url: '',
                      contents_url: '',
                      compare_url: '',
                      merges_url: '',
                      archive_url: '',
                      downloads_url: '',
                      issues_url: '',
                      pulls_url: '',
                      milestones_url: '',
                      notifications_url: '',
                      labels_url: '',
                      releases_url: '',
                      deployments_url: '',
                      created_at: '2024-09-18T09:48:14Z',
                      updated_at: '2024-09-18T09:48:14Z',
                      pushed_at: '2024-09-18T08:46:40Z',
                      git_url: 'git://github.com/codegirle/PakePlus.git',
                      ssh_url: 'git@github.com:codegirle/PakePlus.git',
                      clone_url: 'https://github.com/codegirle/PakePlus.git',
                      svn_url: 'https://github.com/codegirle/PakePlus',
                      homepage: null,
                      size: 253,
                      stargazers_count: 0,
                      watchers_count: 0,
                      language: null,
                      has_issues: false,
                      has_projects: true,
                      has_downloads: true,
                      has_wiki: true,
                      has_pages: false,
                      has_discussions: false,
                      forks_count: 0,
                      mirror_url: null,
                      archived: false,
                      disabled: false,
                      open_issues_count: 0,
                      license: null,
                      allow_forking: true,
                      is_template: false,
                      web_commit_signoff_required: false,
                      topics: [],
                      visibility: 'public',
                      forks: 0,
                      open_issues: 0,
                      watchers: 0,
                      default_branch: 'main',
                      permissions: {
                          admin: true,
                          maintain: true,
                          push: true,
                          triage: true,
                          pull: true,
                      },
                      parent: {
                          id: 0,
                          node_id: 'R_kgDOMvkdyw',
                          name: 'PakePlus',
                          full_name: 'Sjj1024/PakePlus',
                          private: false,
                          owner: {
                              login: 'Sjj1024',
                              id: 0,
                              node_id: '0',
                              avatar_url:
                                  'https://avatars.githubusercontent.com/u/48399687?v=4',
                              gravatar_id: '',
                              url: 'https://api.github.com/users/Sjj1024',
                              html_url: 'https://github.com/Sjj1024',
                              followers_url:
                                  'https://api.github.com/users/Sjj1024/followers',
                              following_url:
                                  'https://api.github.com/users/Sjj1024/following{/other_user}',
                              gists_url:
                                  'https://api.github.com/users/Sjj1024/gists{/gist_id}',
                              starred_url:
                                  'https://api.github.com/users/Sjj1024/starred{/owner}{/repo}',
                              subscriptions_url:
                                  'https://api.github.com/users/Sjj1024/subscriptions',
                              organizations_url:
                                  'https://api.github.com/users/Sjj1024/orgs',
                              repos_url:
                                  'https://api.github.com/users/Sjj1024/repos',
                              events_url:
                                  'https://api.github.com/users/Sjj1024/events{/privacy}',
                              received_events_url:
                                  'https://api.github.com/users/Sjj1024/received_events',
                              type: 'User',
                              site_admin: false,
                          },
                          html_url: 'https://github.com/Sjj1024/PakePlus',
                          description:
                              'Turn any webpage into a desktop app and mobile phone app with Rust. 利用 Rust 轻松构建轻量级多端桌面应用和多端手机应用',
                          fork: false,
                          url: 'https://api.github.com/repos/Sjj1024/PakePlus',
                          forks_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/forks',
                          keys_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/keys{/key_id}',
                          collaborators_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/collaborators{/collaborator}',
                          teams_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/teams',
                          hooks_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/hooks',
                          issue_events_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/issues/events{/number}',
                          events_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/events',
                          assignees_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/assignees{/user}',
                          branches_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/branches{/branch}',
                          tags_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/tags',
                          blobs_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/git/blobs{/sha}',
                          git_tags_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/git/tags{/sha}',
                          git_refs_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/git/refs{/sha}',
                          trees_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/git/trees{/sha}',
                          statuses_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/statuses/{sha}',
                          languages_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/languages',
                          stargazers_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/stargazers',
                          contributors_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/contributors',
                          subscribers_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/subscribers',
                          subscription_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/subscription',
                          commits_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/commits{/sha}',
                          git_commits_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/git/commits{/sha}',
                          comments_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/comments{/number}',
                          issue_comment_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/issues/comments{/number}',
                          contents_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/contents/{+path}',
                          compare_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/compare/{base}...{head}',
                          merges_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/merges',
                          archive_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/{archive_format}{/ref}',
                          downloads_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/downloads',
                          issues_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/issues{/number}',
                          pulls_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/pulls{/number}',
                          milestones_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/milestones{/number}',
                          notifications_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/notifications{?since,all,participating}',
                          labels_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/labels{/name}',
                          releases_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/releases{/id}',
                          deployments_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/deployments',
                          created_at: '2024-09-10T13:12:25Z',
                          updated_at: '2024-09-18T08:46:43Z',
                          pushed_at: '2024-09-18T08:46:40Z',
                          git_url: 'git://github.com/Sjj1024/PakePlus.git',
                          ssh_url: 'git@github.com:Sjj1024/PakePlus.git',
                          clone_url: 'https://github.com/Sjj1024/PakePlus.git',
                          svn_url: 'https://github.com/Sjj1024/PakePlus',
                          homepage: null,
                          size: 253,
                          stargazers_count: 0,
                          watchers_count: 0,
                          language: 'Vue',
                          has_issues: true,
                          has_projects: true,
                          has_downloads: true,
                          has_wiki: true,
                          has_pages: false,
                          has_discussions: false,
                          forks_count: 1,
                          mirror_url: null,
                          archived: false,
                          disabled: false,
                          open_issues_count: 0,
                          license: null,
                          allow_forking: true,
                          is_template: false,
                          web_commit_signoff_required: false,
                          topics: [],
                          visibility: 'public',
                          forks: 1,
                          open_issues: 0,
                          watchers: 0,
                          default_branch: 'main',
                      },
                      source: {
                          id: 0,
                          node_id: '0',
                          name: 'PakePlus',
                          full_name: 'Sjj1024/PakePlus',
                          private: false,
                          owner: {
                              login: 'Sjj1024',
                              id: 0,
                              node_id: '0',
                              avatar_url:
                                  'https://avatars.githubusercontent.com/u/48399687?v=4',
                              gravatar_id: '',
                              url: 'https://api.github.com/users/Sjj1024',
                              html_url: 'https://github.com/Sjj1024',
                              followers_url:
                                  'https://api.github.com/users/Sjj1024/followers',
                              following_url:
                                  'https://api.github.com/users/Sjj1024/following{/other_user}',
                              gists_url:
                                  'https://api.github.com/users/Sjj1024/gists{/gist_id}',
                              starred_url:
                                  'https://api.github.com/users/Sjj1024/starred{/owner}{/repo}',
                              subscriptions_url:
                                  'https://api.github.com/users/Sjj1024/subscriptions',
                              organizations_url:
                                  'https://api.github.com/users/Sjj1024/orgs',
                              repos_url:
                                  'https://api.github.com/users/Sjj1024/repos',
                              events_url:
                                  'https://api.github.com/users/Sjj1024/events{/privacy}',
                              received_events_url:
                                  'https://api.github.com/users/Sjj1024/received_events',
                              type: 'User',
                              site_admin: false,
                          },
                          html_url: 'https://github.com/Sjj1024/PakePlus',
                          description:
                              'Turn any webpage into a desktop app and mobile phone app with Rust. 利用 Rust 轻松构建轻量级多端桌面应用和多端手机应用',
                          fork: false,
                          url: 'https://api.github.com/repos/Sjj1024/PakePlus',
                          forks_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/forks',
                          keys_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/keys{/key_id}',
                          collaborators_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/collaborators{/collaborator}',
                          teams_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/teams',
                          hooks_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/hooks',
                          issue_events_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/issues/events{/number}',
                          events_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/events',
                          assignees_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/assignees{/user}',
                          branches_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/branches{/branch}',
                          tags_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/tags',
                          blobs_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/git/blobs{/sha}',
                          git_tags_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/git/tags{/sha}',
                          git_refs_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/git/refs{/sha}',
                          trees_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/git/trees{/sha}',
                          statuses_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/statuses/{sha}',
                          languages_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/languages',
                          stargazers_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/stargazers',
                          contributors_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/contributors',
                          subscribers_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/subscribers',
                          subscription_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/subscription',
                          commits_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/commits{/sha}',
                          git_commits_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/git/commits{/sha}',
                          comments_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/comments{/number}',
                          issue_comment_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/issues/comments{/number}',
                          contents_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/contents/{+path}',
                          compare_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/compare/{base}...{head}',
                          merges_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/merges',
                          archive_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/{archive_format}{/ref}',
                          downloads_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/downloads',
                          issues_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/issues{/number}',
                          pulls_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/pulls{/number}',
                          milestones_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/milestones{/number}',
                          notifications_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/notifications{?since,all,participating}',
                          labels_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/labels{/name}',
                          releases_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/releases{/id}',
                          deployments_url:
                              'https://api.github.com/repos/Sjj1024/PakePlus/deployments',
                          created_at: '2024-09-10T13:12:25Z',
                          updated_at: '2024-09-18T08:46:43Z',
                          pushed_at: '2024-09-18T08:46:40Z',
                          git_url: 'git://github.com/Sjj1024/PakePlus.git',
                          ssh_url: 'git@github.com:Sjj1024/PakePlus.git',
                          clone_url: 'https://github.com/Sjj1024/PakePlus.git',
                          svn_url: 'https://github.com/Sjj1024/PakePlus',
                          homepage: null,
                          size: 253,
                          stargazers_count: 0,
                          watchers_count: 0,
                          language: 'Vue',
                          has_issues: true,
                          has_projects: true,
                          has_downloads: true,
                          has_wiki: true,
                          has_pages: false,
                          has_discussions: false,
                          forks_count: 0,
                          mirror_url: null,
                          archived: false,
                          disabled: false,
                          open_issues_count: 0,
                          license: null,
                          allow_forking: true,
                          is_template: false,
                          web_commit_signoff_required: false,
                          topics: [],
                          visibility: 'public',
                          forks: 0,
                          open_issues: 0,
                          watchers: 0,
                          default_branch: 'main',
                      },
                      network_count: 0,
                      subscribers_count: 0,
                  },
            // main branch提交信息
            commit: localStorage.getItem('commit')
                ? JSON.parse(localStorage.getItem('commit') as string)
                : {
                      sha: 'f42ea4b062330e78b5af81b4187f5fd59dd3372e',
                      node_id: '',
                      commit: {
                          author: {
                              name: '1024小神',
                              email: '15670339118@163.com',
                              date: '2024-09-18T08:46:29Z',
                          },
                          committer: {
                              name: '1024小神',
                              email: '15670339118@163.com',
                              date: '2024-09-18T08:46:29Z',
                          },
                          message: 'add pinia',
                          tree: {
                              sha: '3b85b6da74530256a9c30724f39022fdaadfc970',
                              url: 'https://api.github.com/repos/codegirle/PakePlus/git/trees/3b85b6da74530256a9c30724f39022fdaadfc970',
                          },
                          url: 'https://api.github.com/repos/codegirle/PakePlus/git/commits/f42ea4b062330e78b5af81b4187f5fd59dd3372e',
                          comment_count: 0,
                          verification: {
                              verified: false,
                              reason: 'unsigned',
                              signature: null,
                              payload: null,
                          },
                      },
                      url: '',
                      html_url: '',
                      comments_url: '',
                      author: {
                          login: 'Sjj1024',
                          id: 48399687,
                          node_id: 'MDQ6VXNlcjQ4Mzk5Njg3',
                          avatar_url:
                              'https://avatars.githubusercontent.com/u/48399687?v=4',
                          gravatar_id: '',
                          url: 'https://api.github.com/users/Sjj1024',
                          html_url: 'https://github.com/Sjj1024',
                          followers_url:
                              'https://api.github.com/users/Sjj1024/followers',
                          following_url:
                              'https://api.github.com/users/Sjj1024/following{/other_user}',
                          gists_url:
                              'https://api.github.com/users/Sjj1024/gists{/gist_id}',
                          starred_url:
                              'https://api.github.com/users/Sjj1024/starred{/owner}{/repo}',
                          subscriptions_url:
                              'https://api.github.com/users/Sjj1024/subscriptions',
                          organizations_url:
                              'https://api.github.com/users/Sjj1024/orgs',
                          repos_url:
                              'https://api.github.com/users/Sjj1024/repos',
                          events_url:
                              'https://api.github.com/users/Sjj1024/events{/privacy}',
                          received_events_url:
                              'https://api.github.com/users/Sjj1024/received_events',
                          type: 'User',
                          site_admin: false,
                      },
                      committer: {
                          login: 'Sjj1024',
                          id: 48399687,
                          node_id: 'MDQ6VXNlcjQ4Mzk5Njg3',
                          avatar_url:
                              'https://avatars.githubusercontent.com/u/48399687?v=4',
                          gravatar_id: '',
                          url: 'https://api.github.com/users/Sjj1024',
                          html_url: 'https://github.com/Sjj1024',
                          followers_url:
                              'https://api.github.com/users/Sjj1024/followers',
                          following_url:
                              'https://api.github.com/users/Sjj1024/following{/other_user}',
                          gists_url:
                              'https://api.github.com/users/Sjj1024/gists{/gist_id}',
                          starred_url:
                              'https://api.github.com/users/Sjj1024/starred{/owner}{/repo}',
                          subscriptions_url:
                              'https://api.github.com/users/Sjj1024/subscriptions',
                          organizations_url:
                              'https://api.github.com/users/Sjj1024/orgs',
                          repos_url:
                              'https://api.github.com/users/Sjj1024/repos',
                          events_url:
                              'https://api.github.com/users/Sjj1024/events{/privacy}',
                          received_events_url:
                              'https://api.github.com/users/Sjj1024/received_events',
                          type: 'User',
                          site_admin: false,
                      },
                      parents: [
                          {
                              sha: 'e8fb5a3a259e411a391e8fe2ed756f060747b2e2',
                              url: 'https://api.github.com/repos/codegirle/PakePlus/commits/e8fb5a3a259e411a391e8fe2ed756f060747b2e2',
                              html_url:
                                  'https://github.com/codegirle/PakePlus/commit/e8fb5a3a259e411a391e8fe2ed756f060747b2e2',
                          },
                      ],
                  },
            // dist branch提交信息
            distCommit: localStorage.getItem('distCommit')
                ? JSON.parse(localStorage.getItem('distCommit') as string)
                : {
                      sha: 'f42ea4b062330e78b5af81b4187f5fd59dd3372e',
                      node_id: '',
                      commit: {
                          author: {
                              name: '1024小神',
                              email: '15670339118@163.com',
                              date: '2024-09-18T08:46:29Z',
                          },
                          committer: {
                              name: '1024小神',
                              email: '15670339118@163.com',
                              date: '2024-09-18T08:46:29Z',
                          },
                          message: 'add pinia',
                          tree: {
                              sha: '3b85b6da74530256a9c30724f39022fdaadfc970',
                              url: 'https://api.github.com/repos/codegirle/PakePlus/git/trees/3b85b6da74530256a9c30724f39022fdaadfc970',
                          },
                          url: 'https://api.github.com/repos/codegirle/PakePlus/git/commits/f42ea4b062330e78b5af81b4187f5fd59dd3372e',
                          comment_count: 0,
                          verification: {
                              verified: false,
                              reason: 'unsigned',
                              signature: null,
                              payload: null,
                          },
                      },
                      url: '',
                      html_url: '',
                      comments_url: '',
                      author: {
                          login: 'Sjj1024',
                          id: 48399687,
                          node_id: 'MDQ6VXNlcjQ4Mzk5Njg3',
                          avatar_url:
                              'https://avatars.githubusercontent.com/u/48399687?v=4',
                          gravatar_id: '',
                          url: 'https://api.github.com/users/Sjj1024',
                          html_url: 'https://github.com/Sjj1024',
                          followers_url:
                              'https://api.github.com/users/Sjj1024/followers',
                          following_url:
                              'https://api.github.com/users/Sjj1024/following{/other_user}',
                          gists_url:
                              'https://api.github.com/users/Sjj1024/gists{/gist_id}',
                          starred_url:
                              'https://api.github.com/users/Sjj1024/starred{/owner}{/repo}',
                          subscriptions_url:
                              'https://api.github.com/users/Sjj1024/subscriptions',
                          organizations_url:
                              'https://api.github.com/users/Sjj1024/orgs',
                          repos_url:
                              'https://api.github.com/users/Sjj1024/repos',
                          events_url:
                              'https://api.github.com/users/Sjj1024/events{/privacy}',
                          received_events_url:
                              'https://api.github.com/users/Sjj1024/received_events',
                          type: 'User',
                          site_admin: false,
                      },
                      committer: {
                          login: 'Sjj1024',
                          id: 48399687,
                          node_id: 'MDQ6VXNlcjQ4Mzk5Njg3',
                          avatar_url:
                              'https://avatars.githubusercontent.com/u/48399687?v=4',
                          gravatar_id: '',
                          url: 'https://api.github.com/users/Sjj1024',
                          html_url: 'https://github.com/Sjj1024',
                          followers_url:
                              'https://api.github.com/users/Sjj1024/followers',
                          following_url:
                              'https://api.github.com/users/Sjj1024/following{/other_user}',
                          gists_url:
                              'https://api.github.com/users/Sjj1024/gists{/gist_id}',
                          starred_url:
                              'https://api.github.com/users/Sjj1024/starred{/owner}{/repo}',
                          subscriptions_url:
                              'https://api.github.com/users/Sjj1024/subscriptions',
                          organizations_url:
                              'https://api.github.com/users/Sjj1024/orgs',
                          repos_url:
                              'https://api.github.com/users/Sjj1024/repos',
                          events_url:
                              'https://api.github.com/users/Sjj1024/events{/privacy}',
                          received_events_url:
                              'https://api.github.com/users/Sjj1024/received_events',
                          type: 'User',
                          site_admin: false,
                      },
                      parents: [
                          {
                              sha: 'e8fb5a3a259e411a391e8fe2ed756f060747b2e2',
                              url: 'https://api.github.com/repos/codegirle/PakePlus/commits/e8fb5a3a259e411a391e8fe2ed756f060747b2e2',
                              html_url:
                                  'https://github.com/codegirle/PakePlus/commit/e8fb5a3a259e411a391e8fe2ed756f060747b2e2',
                          },
                      ],
                  },
            // webCommit
            webCommit: localStorage.getItem('webCommit')
                ? JSON.parse(localStorage.getItem('webCommit') as string)
                : {
                      sha: 'f42ea4b062330e78b5af81b4187f5fd59dd3372e',
                      node_id: '',
                      commit: {
                          author: {
                              name: '1024小神',
                              email: '15670339118@163.com',
                              date: '2024-09-18T08:46:29Z',
                          },
                          committer: {
                              name: '1024小神',
                              email: '15670339118@163.com',
                              date: '2024-09-18T08:46:29Z',
                          },
                          message: 'add pinia',
                          tree: {
                              sha: '3b85b6da74530256a9c30724f39022fdaadfc970',
                              url: 'https://api.github.com/repos/codegirle/PakePlus/git/trees/3b85b6da74530256a9c30724f39022fdaadfc970',
                          },
                          url: 'https://api.github.com/repos/codegirle/PakePlus/git/commits/f42ea4b062330e78b5af81b4187f5fd59dd3372e',
                          comment_count: 0,
                          verification: {
                              verified: false,
                              reason: 'unsigned',
                              signature: null,
                              payload: null,
                          },
                      },
                      url: '',
                      html_url: '',
                      comments_url: '',
                      author: {
                          login: 'Sjj1024',
                          id: 48399687,
                          node_id: 'MDQ6VXNlcjQ4Mzk5Njg3',
                          avatar_url:
                              'https://avatars.githubusercontent.com/u/48399687?v=4',
                          gravatar_id: '',
                          url: 'https://api.github.com/users/Sjj1024',
                          html_url: 'https://github.com/Sjj1024',
                          followers_url:
                              'https://api.github.com/users/Sjj1024/followers',
                          following_url:
                              'https://api.github.com/users/Sjj1024/following{/other_user}',
                          gists_url:
                              'https://api.github.com/users/Sjj1024/gists{/gist_id}',
                          starred_url:
                              'https://api.github.com/users/Sjj1024/starred{/owner}{/repo}',
                          subscriptions_url:
                              'https://api.github.com/users/Sjj1024/subscriptions',
                          organizations_url:
                              'https://api.github.com/users/Sjj1024/orgs',
                          repos_url:
                              'https://api.github.com/users/Sjj1024/repos',
                          events_url:
                              'https://api.github.com/users/Sjj1024/events{/privacy}',
                          received_events_url:
                              'https://api.github.com/users/Sjj1024/received_events',
                          type: 'User',
                          site_admin: false,
                      },
                      committer: {
                          login: 'Sjj1024',
                          id: 48399687,
                          node_id: 'MDQ6VXNlcjQ4Mzk5Njg3',
                          avatar_url:
                              'https://avatars.githubusercontent.com/u/48399687?v=4',
                          gravatar_id: '',
                          url: 'https://api.github.com/users/Sjj1024',
                          html_url: 'https://github.com/Sjj1024',
                          followers_url:
                              'https://api.github.com/users/Sjj1024/followers',
                          following_url:
                              'https://api.github.com/users/Sjj1024/following{/other_user}',
                          gists_url:
                              'https://api.github.com/users/Sjj1024/gists{/gist_id}',
                          starred_url:
                              'https://api.github.com/users/Sjj1024/starred{/owner}{/repo}',
                          subscriptions_url:
                              'https://api.github.com/users/Sjj1024/subscriptions',
                          organizations_url:
                              'https://api.github.com/users/Sjj1024/orgs',
                          repos_url:
                              'https://api.github.com/users/Sjj1024/repos',
                          events_url:
                              'https://api.github.com/users/Sjj1024/events{/privacy}',
                          received_events_url:
                              'https://api.github.com/users/Sjj1024/received_events',
                          type: 'User',
                          site_admin: false,
                      },
                      parents: [
                          {
                              sha: 'e8fb5a3a259e411a391e8fe2ed756f060747b2e2',
                              url: 'https://api.github.com/repos/codegirle/PakePlus/commits/e8fb5a3a259e411a391e8fe2ed756f060747b2e2',
                              html_url:
                                  'https://github.com/codegirle/PakePlus/commit/e8fb5a3a259e411a391e8fe2ed756f060747b2e2',
                          },
                      ],
                  },
            // 当前项目
            currentProject: localStorage.getItem('currentProject')
                ? JSON.parse(localStorage.getItem('currentProject') as string)
                : initProject,
            // 当前项目发布
            currentRelease: localStorage.getItem('currentRelease')
                ? JSON.parse(localStorage.getItem('currentRelease') as string)
                : {
                      url: '',
                      assets_url: '',
                      upload_url: '',
                      html_url: '',
                      id: 0,
                      node_id: '',
                      tag_name: '',
                      target_commitish: '',
                      name: '',
                      draft: false,
                      prerelease: false,
                      created_at: '2024-09-23T10:46:29Z',
                      published_at: '2024-09-23T10:48:30Z',
                      assets: [],
                      tarball_url: '',
                      zipball_url: '',
                      body: '',
                  },
            // 项目列表
            projectList: localStorage.getItem('projectList')
                ? JSON.parse(localStorage.getItem('projectList') as string)
                : ([] as Project[]),
            // 发布信息
            releases: localStorage.getItem('releases')
                ? JSON.parse(localStorage.getItem('releases') as string)
                : ({
                      pakeplus: {
                          url: '',
                          assets_url: '',
                          upload_url: '',
                          html_url: '',
                          id: 0,
                          node_id: '',
                          tag_name: '',
                          target_commitish: '',
                          name: '',
                          draft: false,
                          prerelease: false,
                          created_at: '2024-09-23T10:46:29Z',
                          published_at: '2024-09-23T10:48:30Z',
                          assets: [],
                          tarball_url: '',
                          zipball_url: '',
                          body: '',
                      },
                  } as { [key: string]: any }),
            age: 18,
            sex: '男',
        }
    },
    getters: {
        getAddAge: (state) => {
            return (num: number) => state.age + num
        },
        noSjj1024: (state) => {
            return state.userInfo.login !== 'Sjj1024'
        },
        isRelease: (state) => {
            return state.releases[state.currentProject.name] !== undefined
        },
    },
    actions: {
        setUser(info: any) {
            this.userInfo = info
            localStorage.setItem('userInfo', JSON.stringify(info))
        },
        setRepository(info: any) {
            this.repository = info
            localStorage.setItem('repository', JSON.stringify(info))
        },
        setCommitSha(info: any) {
            this.commit = info
            localStorage.setItem('commit', JSON.stringify(info))
        },
        setDistCommit(info: any) {
            this.distCommit = info
            localStorage.setItem('distCommit', JSON.stringify(info))
        },
        setWebCommit(info: any) {
            this.webCommit = info
            localStorage.setItem('webCommit', JSON.stringify(info))
        },
        setCurrentProject(info: any) {
            this.currentProject = info
            // if project not in projectList, add it
            this.addUpdatePro(info)
            localStorage.setItem('currentProject', JSON.stringify(info))
        },
        addUpdatePro(project: Project) {
            this.currentProject = project
            localStorage.setItem('currentProject', JSON.stringify(project))
            const exist = this.projectList.findIndex((item: Project) => {
                return item.name === project.name
            })
            if (exist !== -1) {
                this.projectList[exist] = project
            } else {
                this.projectList.push(project)
            }
            localStorage.setItem(
                'projectList',
                JSON.stringify(this.projectList)
            )
        },
        delProject(project: Project) {
            // delete release
            this.setRelease(project.name, null)
            const exist = this.projectList.findIndex((item: Project) => {
                return item.name === project.name
            })
            if (exist !== -1) {
                this.projectList.splice(exist, 1)
                localStorage.setItem(
                    'projectList',
                    JSON.stringify(this.projectList)
                )
            }
        },
        setRelease(proName: string, info: any) {
            if (info) {
                this.releases[proName] = info
            } else {
                delete this.releases[proName]
            }
            localStorage.setItem('releases', JSON.stringify(this.releases))
        },
        async setCurrentRelease() {
            if (
                this.releases[this.currentProject.name] &&
                this.releases[this.currentProject.name].id !== 0
            ) {
                this.currentRelease = this.releases[this.currentProject.name]
                this.getRelease()
            } else {
                await this.getRelease()
            }
        },
        // update tauri config
        updateTauriConfig(info: any) {
            this.currentProject.url = info.windows.url
            this.currentProject.more = info
            localStorage.setItem(
                'currentProject',
                JSON.stringify(this.currentProject)
            )
        },
        async getRelease() {
            const releaseRes: any = await githubApi.getReleasesAssets(
                this.userInfo.login,
                'PakePlus',
                this.currentProject.name
            )
            console.log('releaseRes', releaseRes)
            if (
                releaseRes.status === 200 &&
                releaseRes.data.assets.length >= 3
            ) {
                // filter current project version
                const assets = releaseRes.data.assets.filter((item: any) => {
                    return (
                        item.name.includes(this.currentProject.version) ||
                        item.name.includes('tar')
                    )
                })
                const releaseData = {
                    ...releaseRes.data,
                    assets: assets.map((asset: any) => {
                        return {
                            ...asset,
                            updated_at: convertToLocalTime(asset.updated_at),
                        }
                    }),
                }
                this.setRelease(this.currentProject.name, releaseData)
                this.currentRelease = releaseData
                return releaseData
            } else {
                console.error('releaseRes error', releaseRes)
                return null
            }
        },
    },
})
