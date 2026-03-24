using UnityEngine;
using ProjectF.Match;

namespace ProjectF.Utils
{
    /// <summary>
    /// Centralized audio manager.
    /// Plays placeholder SFX and music via AudioSource components.
    /// Listens to GameEvents to trigger contextual audio.
    ///
    /// MVP placeholder strategy per GDD Section 7:
    ///   - Assign royalty-free or generated clips in Inspector.
    ///   - Leave AudioClip fields null to silently skip (no errors).
    ///   - Final audio assets are swapped in post-MVP.
    /// </summary>
    [RequireComponent(typeof(AudioSource))]
    public class AudioManager : MonoBehaviour
    {
        public static AudioManager Instance { get; private set; }

        [Header("Music")]
        [Tooltip("Main menu background music.")]
        [SerializeField] private AudioClip _menuMusic;
        [Tooltip("In-match background music.")]
        [SerializeField] private AudioClip _matchMusic;

        [Header("SFX — Match")]
        [SerializeField] private AudioClip _kickSFX;
        [SerializeField] private AudioClip _passSFX;
        [SerializeField] private AudioClip _goalSFX;
        [SerializeField] private AudioClip _netSFX;
        [SerializeField] private AudioClip _whistleStartSFX;
        [SerializeField] private AudioClip _whistleFoulSFX;
        [SerializeField] private AudioClip _halftimeSFX;

        [Header("SFX — Abilities")]
        [SerializeField] private AudioClip _powerShotSFX;   // fire woosh
        [SerializeField] private AudioClip _ironWallSFX;    // ice crystal

        [Header("SFX — UI")]
        [SerializeField] private AudioClip _buttonClickSFX;
        [SerializeField] private AudioClip _packOpenSFX;
        [SerializeField] private AudioClip _cardRevealSFX;
        [SerializeField] private AudioClip _levelUpSFX;

        [Header("Crowd")]
        [SerializeField] private AudioClip _crowdGoalSFX;
        [SerializeField] private AudioClip _crowdAmbientSFX;

        [Header("Volume")]
        [SerializeField, Range(0f, 1f)] private float _musicVolume  = 0.4f;
        [SerializeField, Range(0f, 1f)] private float _sfxVolume    = 0.8f;

        private AudioSource _musicSource;
        private AudioSource _sfxSource;

        // ── Unity lifecycle ───────────────────────────────────────────────────────

        private void Awake()
        {
            if (Instance != null && Instance != this) { Destroy(gameObject); return; }
            Instance = this;
            DontDestroyOnLoad(gameObject);

            AudioSource[] sources = GetComponents<AudioSource>();
            _musicSource = sources.Length > 0 ? sources[0] : gameObject.AddComponent<AudioSource>();
            _sfxSource   = sources.Length > 1 ? sources[1] : gameObject.AddComponent<AudioSource>();

            _musicSource.loop         = true;
            _musicSource.playOnAwake  = false;
            _musicSource.volume       = _musicVolume;
            _sfxSource.playOnAwake    = false;
            _sfxSource.volume         = _sfxVolume;
        }

        private void OnEnable()
        {
            GameEvents.OnMatchStarted   += OnMatchStarted;
            GameEvents.OnHalfTime       += OnHalfTime;
            GameEvents.OnMatchEnded     += OnMatchEnded;
            GameEvents.OnGoalScored     += OnGoalScored;
            GameEvents.OnFoul           += OnFoul;
            GameEvents.OnAbilityActivated += OnAbilityActivated;
        }

        private void OnDisable()
        {
            GameEvents.OnMatchStarted   -= OnMatchStarted;
            GameEvents.OnHalfTime       -= OnHalfTime;
            GameEvents.OnMatchEnded     -= OnMatchEnded;
            GameEvents.OnGoalScored     -= OnGoalScored;
            GameEvents.OnFoul           -= OnFoul;
            GameEvents.OnAbilityActivated -= OnAbilityActivated;
        }

        // ── Public API ────────────────────────────────────────────────────────────

        public void PlayMenuMusic()   => PlayMusic(_menuMusic);
        public void PlayMatchMusic()  => PlayMusic(_matchMusic);
        public void StopMusic()       => _musicSource.Stop();

        public void PlayKick()        => PlaySFX(_kickSFX);
        public void PlayPass()        => PlaySFX(_passSFX);
        public void PlayButtonClick() => PlaySFX(_buttonClickSFX);
        public void PlayPackOpen()    => PlaySFX(_packOpenSFX);
        public void PlayCardReveal()  => PlaySFX(_cardRevealSFX);
        public void PlayLevelUp()     => PlaySFX(_levelUpSFX);

        public void SetMusicVolume(float v) { _musicVolume = v; _musicSource.volume = v; }
        public void SetSFXVolume(float v)   { _sfxVolume   = v; _sfxSource.volume   = v; }

        // ── Event handlers ────────────────────────────────────────────────────────

        private void OnMatchStarted()
        {
            PlayMatchMusic();
            PlaySFX(_whistleStartSFX);
        }

        private void OnHalfTime()
        {
            PlaySFX(_halftimeSFX);
        }

        private void OnMatchEnded(MatchResult _)
        {
            StopMusic();
        }

        private void OnGoalScored(GoalData _)
        {
            PlaySFX(_goalSFX);
            PlaySFX(_netSFX);
            PlaySFX(_crowdGoalSFX);
        }

        private void OnFoul(PlayerEventData _)
        {
            PlaySFX(_whistleFoulSFX);
        }

        private void OnAbilityActivated(PlayerEventData _)
        {
            // TODO: differentiate Power Shot vs Iron Wall by player/card lookup
            // For MVP: play first available ability SFX
            PlaySFX(_powerShotSFX ?? _ironWallSFX);
        }

        // ── Helpers ───────────────────────────────────────────────────────────────

        private void PlayMusic(AudioClip clip)
        {
            if (clip == null) return;
            if (_musicSource.clip == clip && _musicSource.isPlaying) return;
            _musicSource.clip = clip;
            _musicSource.Play();
        }

        private void PlaySFX(AudioClip clip)
        {
            if (clip == null) return;
            _sfxSource.PlayOneShot(clip, _sfxVolume);
        }
    }
}
